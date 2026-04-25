# Hostinger Deployment Guide for Eshan Enterprise

This guide outlines how to deploy your Next.js application to Hostinger's Node.js hosting environment.

## 1. Configuration Changes
We have made the following changes to make your site "Hostinger friendly":
- **`next.config.ts`**: Enabled `standalone` output mode.
- **`package.json`**: Added `sharp` for optimized image processing.
- **`server.js`**: Added a root entry point for Hostinger's Node.js manager.

## 2. Preparation (Local)
Run the build command in your terminal:
```bash
npm run build
```

## 3. Deployment Steps
1. **Locate Build Files**: After building, check the `.next/standalone` directory.
2. **Copy Assets**: 
   - Copy the `public` folder into `.next/standalone/public`
   - Copy the `.next/static` folder into `.next/standalone/.next/static`
3. **Upload**: Upload the *contents* of `.next/standalone` to your Hostinger server (usually via FTP or File Manager).
4. **Environment Variables**: Set your `MONGODB_URI` in the Hostinger hPanel under the Node.js configuration section.
5. **Startup File**: Set the application startup file to `server.js` in hPanel.

## 4. Why these changes?
- **Standalone Output**: Next.js bundles only the necessary code, making it lightweight and compatible with shared/VPS hosting.
- **Sharp**: Improves image loading speeds and reduces server CPU usage.
- **Root server.js**: Hostinger's automated systems look for a `server.js` file in the root directory to start your application.
