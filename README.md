# LiveOverlayExtension

A Chrome extension for pixel-perfect visual comparison of two **live websites**. This tool is ideal for frontend developers, designers, and QA testers who need to overlay a staging or production site directly on top of another to validate layout accuracy, design drift, or content alignment — all in real time.

---

## 🔧 Features

- ✅ Live iframe overlay of any URL
- 🎚️ Adjustable opacity slider for visual blending
- 🌐 Custom overlay URL input for flexible comparisons
- 🌗 Invert colors toggle to aid visibility
- 🔒 Disable scrolling on the base site to freeze layout
- 🧱 Overlay iframe uses hidden scrollbars to prevent layout shift
- 🖱️ Draggable floating control panel (non-intrusive, lightweight)

---

## 🚀 Installation & Usage

### 1. Clone this repo:

```bash
git clone https://github.com/TristanEDU/LiveOverlayExtension.git
cd LiveOverlayExtension
```

### 2. Load in Chrome:

1. Open Chrome and go to `chrome://extensions/`
2. Enable **Developer Mode**
3. Click **Load unpacked**
4. Select the `LiveOverlayExtension` directory

### 3. Usage Instructions

- Navigate to any site (e.g., your dev or test environment)
- The floating control panel will appear in the top-right corner
- Enter the overlay URL (e.g. your staging or production version)
- Adjust opacity, lock scrolling, or invert colors for better contrast
- Drag the control panel wherever you like for convenience

---

## ⚠️ Important Warnings & Limitations

### ❌ Iframe Restrictions

Many websites (especially large platforms or secure systems) use headers like `X-Frame-Options: DENY` or CSP rules like `frame-ancestors 'none'`, which **prevent them from being embedded** in an iframe.

If you attempt to overlay a site that blocks iframing, you’ll see this in the Chrome Console:

```
Refused to display 'https://example.com' in a frame because it set 'X-Frame-Options' to 'DENY'.
```

**✅ Recommended workaround:**  
Use this tool in environments you control (dev/staging), and temporarily disable these headers during QA review.

### 🔐 Security Notice

This extension disables pointer events on the overlay for safety and overlays URLs in read-only mode. However:

- You should **never enter passwords, API keys, or sensitive content** into the overlayed page
- The overlay is rendered but not sandboxed — treat it as real browser content
- Do not use on high-security internal systems without explicit authorization

---

## 👥 Collaborators

| Name           | GitHub Username                                | Role                     |
| -------------- | ---------------------------------------------- | ------------------------ |
| Tristan Thomas | [`@TristanEDU`](https://github.com/TristanEDU) | Creator & Lead Developer |

---

## 🤝 Contribution Guidelines

We welcome clean, well-documented contributions that enhance the tool’s functionality or usability.

### ✅ To Contribute:

1. **Fork the repo**
2. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature
   ```
3. **Write clear, maintainable code**
4. **Test on multiple pages and overlay URLs**
5. **Submit a pull request**, including:
   - Summary of what you changed
   - Screenshots (if UI-related)
   - Why the change improves the tool

### 🛠️ Development Principles

- Use vanilla JavaScript only (no dependencies)
- Keep UI simple and minimal
- Maintain compatibility with all Chromium-based browsers
- Focus on developer experience and visual fidelity

---

## 📄 License

**MIT License** — free to use, modify, and distribute. Attribution appreciated.
