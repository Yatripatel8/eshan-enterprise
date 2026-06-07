# Hostinger Shared Hosting – Deployment Guide

This guide explains how to build the Eshan Enterprise website as a fully static export
and upload it to Hostinger shared hosting (no Node.js required).

---

## Prerequisites

- Node.js 18+ installed locally
- Access to the Neon PostgreSQL database (used only at build time)
- Hostinger account with File Manager access or FTP credentials

---

## Step 1 – Set Environment Variables for Build

Ensure your `.env` file in the project root has the correct values:

```env
DATABASE_URL="postgresql://..."   # Neon connection string – needed at build time only
```

> **Important:** The database is only contacted during `npm run build` to pre-render pages.
> The deployed static files contain no database credentials.

---

## Step 2 – Install Dependencies

```bash
npm install
npx prisma generate
```

---

## Step 3 – Run the Static Build

```bash
npm run build
```

Next.js will:
1. Connect to your Neon database
2. Fetch all categories and products
3. Pre-render every page as static HTML
4. Output everything to the `out/` folder

> If the build succeeds, you'll see `out/` created in the project root.

---

## Step 4 – Verify the Output

```
out/
├── index.html              ← Home page
├── about/index.html
├── categories/index.html
├── categories/[slug]/index.html   ← One file per category
├── product/[id]/index.html        ← One file per product
├── search/index.html
├── contact/index.html
├── privacy/index.html
├── terms/index.html
├── _next/                  ← CSS, JS bundles (hashed filenames)
├── images/                 ← Copied from public/
└── .htaccess               ← Apache routing rules
```

---

## Step 5 – Upload to Hostinger

### Option A – File Manager (recommended for first deploy)

1. Log in to **Hostinger hPanel** → **File Manager**
2. Navigate to `public_html/`
3. Delete any existing files (or back them up first)
4. Click **Upload** and select **all files and folders** inside the `out/` directory
   - Upload the contents of `out/`, not the `out/` folder itself
5. Make sure `.htaccess` is uploaded (it may be hidden — enable "Show Hidden Files" in File Manager)

### Option B – FTP / SFTP

```bash
# Using lftp (Linux/macOS) or FileZilla (Windows)
lftp -e "mirror -R ./out/ /public_html/" -u YOUR_FTP_USER,YOUR_FTP_PASS YOUR_FTP_HOST
```

Or use **FileZilla**:
1. Connect to your Hostinger FTP server
2. Upload the **contents** of `out/` into `public_html/`

---

## Step 6 – Enable `.htaccess` on Hostinger

Hostinger shared hosting uses Apache and supports `.htaccess` by default.
The `.htaccess` file in `out/` (copied from `public/.htaccess`) handles:

- Clean URL routing (`/about` → `/about/index.html`)
- SPA fallback for client-side navigation
- GZIP compression
- Browser caching (1 year for assets)

No extra Hostinger configuration is needed.

---

## Step 7 – Test Your Deployment

Visit your domain and verify:

- [ ] Home page loads with categories and featured products
- [ ] Category pages work (e.g. `/categories/bathroom-shelves/`)
- [ ] Product detail pages work (e.g. `/product/[id]/`)
- [ ] Search works (type in navbar → results filter client-side)
- [ ] Contact page shows correctly
- [ ] Images load (Cloudinary URLs embedded at build time)
- [ ] Mobile navigation works

---

## Re-deploying After Adding Products or Categories

Because the site is fully static, **you must rebuild and re-upload when content changes**:

```bash
npm run build    # re-fetches latest data from Neon DB
# then upload out/ contents to public_html/ again
```

---

## Admin Panel

The admin panel (`/admin`) requires a live Node.js server and **does not run on Hostinger shared hosting**.

To manage products and categories:

| Option | How |
|--------|-----|
| **Locally** | Run `npm run dev` on your machine, manage content, then rebuild |
| **Separate server** | Deploy the full Next.js app on Vercel / Railway / Render for admin use |

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Pages return 404 | Ensure `.htaccess` was uploaded and `mod_rewrite` is enabled (it is on Hostinger by default) |
| Old content showing | Clear Hostinger cache in hPanel → Advanced → Cache Manager |
| Images not loading | Check Cloudinary URLs are correct in the database |
| Build fails with DB error | Verify `DATABASE_URL` in `.env` is the Neon pooled connection string |
| `out/` folder not created | Ensure `next.config.ts` has `output: 'export'` and no API routes exist |
