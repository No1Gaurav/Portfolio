# 🚀 Portfolio Deployment Guide

## 📋 Prerequisites

Before deploying your portfolio, ensure you have:
- Node.js (v18 or higher)
- npm or yarn package manager
- Git installed and configured

## 🔧 Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/No1Gaurav/Portfolio.git
cd Portfolio/TPortfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Visit `http://localhost:5173` to view your portfolio locally.

### 4. Build for Production
```bash
npm run build
```

## 🌐 Deployment Options

### Option 1: GitHub Pages (Recommended)

1. **Enable GitHub Pages:**
   - Go to your repository settings
   - Navigate to "Pages" section
   - Select "GitHub Actions" as source

2. **Create GitHub Actions Workflow:**
   Create `.github/workflows/deploy.yml` in your repository root:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
        cache-dependency-path: TPortfolio/package-lock.json
        
    - name: Install dependencies
      run: |
        cd TPortfolio
        npm ci
        
    - name: Build
      run: |
        cd TPortfolio
        npm run build
        
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: TPortfolio/dist
```

### Option 2: Netlify

1. Connect your GitHub repository to Netlify
2. Set build directory to `TPortfolio`
3. Set publish directory to `TPortfolio/dist`
4. Build command: `npm run build`

### Option 3: Vercel

1. Import your GitHub repository to Vercel
2. Set root directory to `TPortfolio`
3. Framework preset: Vite
4. Deploy automatically

## 🎯 Portfolio Features

- ✨ Interactive Neural Network Visualization
- 🎨 Custom Cursor with Smooth Animations
- 🌟 Particle Background System
- 📱 Fully Responsive Design
- 🔥 Modern React 19.1.1 + Vite
- 💫 Glass Morphism Effects
- 🎭 Advanced CSS Animations

## 🛠️ Tech Stack

- **Frontend:** React 19.1.1, Vite 7.1.3
- **Styling:** Tailwind CSS 4.1.12, Custom CSS
- **Animations:** Pure CSS (no JavaScript libraries)
- **Build Tool:** Vite with optimizations

## 📁 Project Structure

```
TPortfolio/
├── src/
│   ├── App.jsx              # Main React component
│   ├── main.jsx             # Entry point
│   └── ml-pipeline-theme.css # Custom styles
├── public/                  # Static assets
├── package.json            # Dependencies
└── vite.config.js          # Vite configuration
```

## 🎨 Customization

### Colors
Edit the CSS custom properties in `ml-pipeline-theme.css` to change the color scheme.

### Content
Update the `portfolioNodes` array in `App.jsx` to modify portfolio sections.

### Animations
Customize animations by modifying the CSS keyframes and transitions.

## 🐛 Troubleshooting

### Build Issues
- Ensure Node.js version is 18+
- Clear `node_modules` and reinstall: `rm -rf node_modules package-lock.json && npm install`

### Deployment Issues
- Check that build directory is correctly set
- Verify all dependencies are in `package.json`
- Ensure no TypeScript errors (if using TS)

## 📞 Support

For issues or questions:
- Email: gsharma190805@gmail.com
- GitHub: [@No1Gaurav](https://github.com/No1Gaurav)
- LinkedIn: [Gaurav Sharma](https://www.linkedin.com/in/gaurav-sharma19)

---

Made with ❤️ by Gaurav Sharma
