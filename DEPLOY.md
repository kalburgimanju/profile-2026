# Deployment Instructions

Your portfolio website is now **LIVE** on Netlify! 🚀

- **Netlify URL**: [https://manjunath-kalburgi-2026.netlify.app](https://manjunath-kalburgi-2026.netlify.app)
- **Deployment Method**: Netlify CLI (Static Deploy)

---

### GitHub Pages (Optional)
If you still want to host it on GitHub Pages as well, follow these steps:

### 1. Create a new Repository
- Go to [GitHub](https://github.com/new) and create a new repository named `portfolio`.
- Do **not** initialize it with a README or .gitignore.

### 2. Push the code
Run these commands in your terminal inside the `portfolio` folder:
```bash
git remote add origin https://github.com/kalburgimanjunath/portfolio.git
git push -u origin main
```

### 3. Enable GitHub Pages
- Go to your repo **Settings** > **Pages**.
- Under **Build and deployment** > **Source**, select **GitHub Actions**.

### 4. Automatic Build
The GitHub Action I set up in `.github/workflows/deploy.yml` will automatically build and deploy your site to `https://kalburgimanjunath.github.io/portfolio/`.

---
**Note:** If you name your repository something other than `portfolio`, please update the `base` field in `vite.config.js` to match the repository name!
