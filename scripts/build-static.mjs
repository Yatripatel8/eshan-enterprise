/**
 * build-static.mjs
 *
 * Produces a fully static export (out/) for Hostinger shared hosting.
 *
 * What it does:
 *  1. Backs up admin page files that use server actions
 *  2. Replaces them with static placeholder pages (no server action imports)
 *  3. Runs `next build` with NEXT_EXPORT=true
 *  4. Restores every backed-up file (always, even if the build fails)
 *
 * Usage:  node scripts/build-static.mjs
 *    or:  npm run build:static
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

// ---------------------------------------------------------------------------
// Static replacement content for each admin file
// ---------------------------------------------------------------------------

const NOTICE_PAGE = `import AdminNotice from '@/app/admin/_AdminNotice';

export default function Page() {
  return <AdminNotice />;
}
`;

const NOTICE_PAGE_WITH_PARAMS = `import AdminNotice from '../../_AdminNotice';

export function generateStaticParams() {
  return [];
}

export default function Page() {
  return <AdminNotice />;
}
`;

const CLIENT_SHELL = `'use client';
export default function Shell() { return null; }
`;

const LAYOUT_SHELL = `export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
`;

// ---------------------------------------------------------------------------
// Map: relative file path → replacement content (flat files only)
// ---------------------------------------------------------------------------
const SWAP_MAP = {
  'src/app/admin/page.tsx':                   NOTICE_PAGE,
  'src/app/admin/layout.tsx':                 LAYOUT_SHELL,
  'src/app/admin/login/page.tsx':             NOTICE_PAGE,
  'src/app/admin/products/page.tsx':          NOTICE_PAGE,
  'src/app/admin/products/ProductClient.tsx': CLIENT_SHELL,
  'src/app/admin/categories/page.tsx':        NOTICE_PAGE,
  'src/app/admin/categories/CategoryClient.tsx': CLIENT_SHELL,
};

// Dynamic route directories to temporarily remove (Turbopack requires no
// dynamic segment without a working generateStaticParams in export mode)
const REMOVE_DIRS = [
  'src/app/admin/products/[id]',
];

// ---------------------------------------------------------------------------
// Clear Next.js build cache to avoid stale cache errors
// ---------------------------------------------------------------------------
const nextCache = path.join(ROOT, '.next');
if (fs.existsSync(nextCache)) {
  fs.rmSync(nextCache, { recursive: true, force: true });
  console.log('  🧹 Cleared  .next cache');
}

// ---------------------------------------------------------------------------
// Backup originals and write placeholders
// ---------------------------------------------------------------------------
const backups = {};
const removedDirs = {}; // dir path → { file: content }

console.log('\n📦 Preparing static build for Hostinger...\n');

for (const [rel, replacement] of Object.entries(SWAP_MAP)) {
  const full = path.join(ROOT, rel);
  if (fs.existsSync(full)) {
    backups[full] = fs.readFileSync(full, 'utf8');
    fs.writeFileSync(full, replacement, 'utf8');
    console.log(`  ↔ Swapped  ${rel}`);
  }
}

for (const rel of REMOVE_DIRS) {
  const full = path.join(ROOT, rel);
  if (fs.existsSync(full)) {
    const files = fs.readdirSync(full);
    removedDirs[full] = {};
    for (const f of files) {
      removedDirs[full][f] = fs.readFileSync(path.join(full, f), 'utf8');
    }
    fs.rmSync(full, { recursive: true, force: true });
    console.log(`  🗑  Removed  ${rel}`);
  }
}

// ---------------------------------------------------------------------------
// Run the static build
// ---------------------------------------------------------------------------
let buildOk = false;
try {
  console.log('\n🔨 Running next build (static export)...\n');
  execSync('npx next build', {
    cwd: ROOT,
    env: { ...process.env, NEXT_EXPORT: 'true' },
    stdio: 'inherit',
  });
  buildOk = true;
} catch {
  console.error('\n❌ Build failed — restoring original files.\n');
} finally {
  // ---------------------------------------------------------------------------
  // Always restore original files and removed directories
  // ---------------------------------------------------------------------------
  for (const [full, original] of Object.entries(backups)) {
    fs.writeFileSync(full, original, 'utf8');
  }
  for (const [dirFull, files] of Object.entries(removedDirs)) {
    fs.mkdirSync(dirFull, { recursive: true });
    for (const [f, content] of Object.entries(files)) {
      fs.writeFileSync(path.join(dirFull, f), content, 'utf8');
    }
  }
  console.log('\n✅ Admin files restored to original state.\n');
}

if (buildOk) {
  console.log('🚀 Static export ready in  out/');
  console.log('   Upload the CONTENTS of out/ to your Hostinger public_html/ folder.');
  console.log('   See HOSTINGER_DEPLOYMENT.md for the full guide.\n');
} else {
  process.exit(1);
}
