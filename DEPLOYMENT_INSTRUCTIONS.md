# Hostinger Deployment Guide for Eshan Enterprise

This project is configured for **Node.js hosting** on Hostinger using Next.js **Standalone Output** mode. This is the most efficient way to run Next.js on a server.

## 1. Preparation
Run the following command locally to build the project and prepare the deployment files:
```bash
npm run deploy:prepare
```
This command:
1. Builds the production bundle.
2. Creates a self-contained server in `.next/standalone`.
3. Copies your `public` folder and static assets into the standalone directory.

## 2. What to Upload
You need to upload the contents of the **`.next/standalone`** folder to your Hostinger server (usually via FTP/File Manager to the `public_html` or your application root).

**Files/Folders to include:**
- `.next/` (inside the standalone folder)
- `node_modules/` (inside the standalone folder)
- `public/` (copied by the script)
- `server.js` (the root entry point)
- `package.json`

## 3. Hostinger Configuration
1. **Node.js Version**: Ensure your Hostinger Node.js selector is set to **Node.js 18 or higher** (recommended: 20).
2. **Application Entry Point**: Set the entry point to `server.js`.
3. **Environment Variables**: Add the following variables in your Hostinger dashboard:
   - `NODE_ENV`: `production`
   - `NEXT_PUBLIC_SUPABASE_URL`: (Your Supabase URL)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: (Your Supabase Anon Key)
   - `PORT`: `3000` (or whatever Hostinger assigns)

## 4. Why this setup?
- **Performance**: Using `output: 'standalone'` drastically reduces the size of the deployment and speeds up cold starts.
- **Image Optimization**: The project uses `sharp`, which is the industry standard for fast image processing in Next.js production.
- **Reliability**: The `server.js` at the root is specifically designed to work with Hostinger's Node.js manager.

## 5. Important Warnings
- **Database**: This project now depends on **Supabase**. Ensure your database tables and policies are set up correctly before deploying.
- **Shared Hosting**: If you are using "Web Hosting" (Shared) rather than "Node.js Hosting", you cannot run this dynamic version. You would need to use `output: 'export'` in `next.config.ts`, but this would disable the Search and dynamic category features.
