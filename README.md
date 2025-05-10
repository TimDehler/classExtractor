# ClassExtractor

**ClassExtractor** is a Visual Studio Code extension that helps front-end developers quickly extract unique CSS class names from selected HTML, JSX, or Shopify Liquid code and copy them to the clipboard — ready to use in your stylesheets or utility-first frameworks like Tailwind CSS.

---

## 🚀 Features

- 🔍 **Class Name Extraction** — Extracts all CSS class names from the selected code.
- 🧼 **Duplicate Removal** — Returns a clean, unique list of class names.
- ✂️ **CSS Format Output** — Converts them into `.class-name {}` blocks.
- 📋 **Clipboard Integration** — Automatically copies results to your clipboard.
- 🧠 **Smart Language Support** — Works with:

  - HTML
  - JSX (`className`)
  - Shopify Liquid (requires the [Shopify Liquid extension](https://marketplace.visualstudio.com/items?itemName=Shopify.theme-check-vscode))

---

## 🧩 Requirements

- To extract classes from `.liquid` files, install the [Shopify Liquid VS Code Extension](https://marketplace.visualstudio.com/items?itemName=Shopify.theme-check-vscode).

---

## ⚙️ Extension Settings

ClassExtractor does not add custom settings at the moment.

---

## 🐞 Known Issues

- `.liquid` file support only works if the Shopify Liquid extension is installed.
- Files other than `.html`, `.jsx`, or `.liquid` are not supported and will display an error.

---

## 📝 Release Notes

### 1.1.0

- Added support for `.jsx` files.
- Improved feedback for unsupported file types.

### 1.0.1

- Fixed recognition bug for `.liquid` files when the Shopify extension is missing.

### 1.0.0

- Initial release. Supports HTML, JSX, and Liquid file extraction.

---

## 🔮 Upcoming Changes

- ✅ Support for additional file types:

  - Vue.js (`.vue`)
  - Angular templates
  - Svelte components

- 🧠 Smarter regex handling (e.g., dynamic or conditional classes)
- 🎨 UI enhancements and optional file output (`.css`)
- 🧩 Extension icon/logo

---

## 👤 Author

Developed and maintained by **\[Tim Dehler]**
Open-source and maintained for the dev community ❤️
