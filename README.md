![splash](./docs/splash.png)

https://github.com/user-attachments/assets/93efd7a8-a660-47f5-bfbd-3d3e7755e2eb


---

![example](./docs/example.png)

---

Browser extension to unhype/neutralise headers on the web.

# Installation

## From extension stores

| Browser | Link |
|---------|------|
| Google Chrome | [Chrome Web Store](https://chromewebstore.google.com/detail/unhype/nmnhedloogpjnfbmkipcolejljminncl?authuser=0&hl=en) |
| Microsoft Edge | Pending review |
| Mozilla Firefox | Pending review |

## Manual

Download a zip archive with the extension for your browser from the [releases page](https://github.com/av/unhype/releases).

### Google Chrome

- Open Chrome and navigate to `chrome://extensions.`
- Enable "Developer mode" using the toggle switch, usually found in the top right corner.
- Click the "Load unpacked" button that appears.
- Select the folder where you extracted the extension files.

### Microsoft Edge

- Open Edge and navigate to `edge://extensions.`
- Enable "Developer mode" using the toggle switch, typically located in the bottom left corner.
- Click the "Load unpacked" button that appears, usually on the main extensions bar.
- Select the folder containing the extracted extension files.

### Mozilla Firefox

- Open Firefox and type about:debugging into the address bar, then press Enter.
- In the left-hand sidebar, click on "This Firefox".
- Click the "Load Temporary Add-on..." button.
- Navigate to the folder where you extracted the extension files and select either the manifest.json file or the ZIP file itself.
- Note: For Firefox, temporary add-ons are removed when you close the browser. For a more permanent installation of a self-developed extension, it typically needs to be signed by Mozilla.

Download from the latest release on [GitHub](https://github.com/av/unhype/releases)

# Development

```bash
git clone https://github.com/av/unhype.git && cd unhype

bun install
bun run dev
```
