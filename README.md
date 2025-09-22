# AppGuide Hugo Theme

A modern, responsive Hugo theme designed for app guide websites with download center, tutorials, and FAQ sections.

![Hugo Theme](https://img.shields.io/badge/Hugo-Theme-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![Hugo Version](https://img.shields.io/badge/Hugo-0.112.0+-orange)

## ✨ Features

- 📱 **Responsive Design** - Built with Tailwind CSS for perfect mobile experience
- 🚀 **App Download Center** - Platform detection and automatic download links
- 📚 **Tutorial System** - Comprehensive guides with structured navigation
- ❓ **Interactive FAQ** - Collapsible FAQ sections with search functionality
- 🔍 **SEO Optimized** - Structured data and meta tags for better search visibility
- ⚙️ **Configurable** - Easy customization through config parameters
- 🔐 **Checksum Verification** - Automatic file integrity verification
- 🌐 **Multi-platform** - Support for iOS, Android, Windows, macOS, Linux

## 🚀 Quick Start

### Installation

1. Add the theme to your Hugo site:
   ```bash
   git submodule add https://github.com/kxnotes/hugo-appguide-theme.git themes/appguide
   ```

2. Update your `config.yaml`:
   ```yaml
   theme: appguide
   ```

### Basic Configuration

Add the following to your `config.yaml`:

```yaml
params:
  app:
    name: "Your App Name"
    tagline: "Your app tagline"
    logo: "placeholder-app.svg"
    image: "placeholder-app.svg"
    screenshot: "placeholder-app.svg"
    favicon: "/favicon.ico"
    
  stores:
    google_play: "https://play.google.com/store/apps/details?id=your.app.id"
    app_store: "https://apps.apple.com/app/your-app/id123456789"
    github: "https://github.com/yourusername/yourapp"
```

## 📁 Content Structure

Create the following content files:

```
content/
├── _index.md          # Homepage
├── about.md           # About page
├── download.md        # Download page
├── faq.md            # FAQ page
└── guides/           # Tutorial guides
    ├── _index.md
    ├── setup.md
    └── advanced.md
```

## 🎨 Customization

### Theme Development

To work on the theme independently:

1. Navigate to the theme directory:
   ```bash
   cd themes/appguide
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build CSS (development):
   ```bash
   npm run build-css
   ```

4. Build CSS (production):
   ```bash
   npm run build-css-prod
   ```

### Configuration Options

#### App Information
```yaml
params:
  app:
    name: "App Name"           # Your app name
    tagline: "App Description" # Short description
    logo: "logo.svg"          # App logo
    image: "app-image.png"    # Main app image
    screenshot: "screen.png"   # App screenshot
    favicon: "/favicon.ico"    # Site favicon
```

#### Store Links
```yaml
params:
  stores:
    google_play: "https://play.google.com/..."
    app_store: "https://apps.apple.com/..."
    github: "https://github.com/..."
    official_site: "https://yoursite.com"
```

#### Features List
```yaml
params:
  features:
    - title: "Feature 1"
      description: "Feature description"
      icon: "icon-name"
    - title: "Feature 2"
      description: "Another feature"
      icon: "icon-name"
```

## 📂 File Structure

```
themes/appguide/
├── assets/
│   ├── css/           # Tailwind CSS files
│   └── js/            # JavaScript files
├── layouts/
│   ├── _default/      # Default templates
│   ├── partials/      # Partial templates
│   └── shortcodes/    # Hugo shortcodes
├── static/            # Static assets
├── exampleSite/       # Example configuration
├── tailwind.config.js # Tailwind configuration
├── package.json       # Node.js dependencies
├── theme.yaml         # Theme metadata
└── README.md          # This file
```

## 🛠️ Development

### Prerequisites

- Hugo 0.112.0 or higher
- Node.js and npm (for Tailwind CSS)

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/kxnotes/hugo-appguide-theme.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   hugo server
   ```

## 📄 License

This theme is released under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or need help, please [open an issue](https://github.com/kxnotes/hugo-appguide-theme/issues) on GitHub.

---

Made with ❤️ by [KX Notes](https://github.com/kxnotes)