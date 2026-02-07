# GitLab Issue Number Enhancement

A Firefox extension that makes GitLab issue numbers more prominent on git.doit.wisc.edu, similar to GitHub's design.

## Features

- **Larger, bolder issue numbers** - Issue numbers are displayed in 18px bold font (vs default ~12px)
- **GitHub-inspired styling** - Green color scheme (#1f883d) matching GitHub's aesthetic
- **Works across all views** - Enhances issue numbers in:
  - Issues list pages
  - Issue detail pages
  - Issue boards (Kanban view)
  - Requirements pages
- **Dynamic content support** - Automatically detects and enhances dynamically loaded content
- **Dark mode compatible** - Adapts colors for dark theme
- **Zero network activity** - Fully local, no external requests
- **Domain-specific** - Only runs on git.doit.wisc.edu

## Installation

### Temporary Installation (for testing)

1. Open Firefox
2. Navigate to `about:debugging#/runtime/this-firefox`
3. Click **"Load Temporary Add-on"**
4. Navigate to the `gitlab-issue-enhancer` directory
5. Select the `manifest.json` file

The extension will be active until you close Firefox.

### Permanent Installation

#### Option 1: Sign and Install (Recommended)

1. Create an account at [addons.mozilla.org](https://addons.mozilla.org)
2. Go to [Developer Hub](https://addons.mozilla.org/developers/)
3. Submit the extension for signing
4. Once signed, install the `.xpi` file

#### Option 2: Use Developer Edition/Nightly

Firefox Developer Edition and Nightly allow unsigned extensions:

1. Open Firefox Developer Edition/Nightly
2. Navigate to `about:config`
3. Set `xpinstall.signatures.required` to `false`
4. Install using `about:addons` → "Install Add-on From File"

## Usage

Once installed, the extension works automatically:

1. Visit any page on `git.doit.wisc.edu`
2. Issue numbers will automatically be enhanced with:
   - Larger font size (18px)
   - Bold weight
   - Green color (#1f883d)
   - Better spacing

No configuration needed - it just works!

## Testing

To verify the extension is working:

1. Navigate to an issues list: `https://git.doit.wisc.edu/[project]/issues`
2. Check that issue numbers (e.g., #123) are displayed in larger, green, bold text
3. Open an issue board: `https://git.doit.wisc.edu/[project]/boards`
4. Verify that issue numbers on cards are enhanced
5. Open the browser console (F12) - there should be no errors

## Troubleshooting

**Issue numbers not enhanced:**
- Check that you're on git.doit.wisc.edu (extension only works there)
- Open browser console (F12) and look for JavaScript errors
- Try refreshing the page

**Extension not loading:**
- Verify the extension is enabled in `about:addons`
- Check for errors in `about:debugging`

**Dark mode colors wrong:**
- Extension should automatically detect dark mode
- If not, check GitLab's theme attribute on the body element

## Privacy & Security

- **No network permissions** - Extension cannot make any network requests
- **No data collection** - No analytics, tracking, or data collection
- **Domain-restricted** - Only runs on git.doit.wisc.edu
- **Open source** - All code is visible and auditable

## Technical Details

- **Manifest Version:** 2 (for Firefox compatibility)
- **Permissions:** None (no special permissions required)
- **Content Scripts:** JavaScript + CSS injection on git.doit.wisc.edu
- **Dynamic Content:** Uses MutationObserver for Vue.js/SPA navigation

## Development

### Project Structure

```
gitlab-issue-enhancer/
├── manifest.json          # Extension manifest
├── content.js            # DOM manipulation script
├── styles.css            # Issue number styling
├── icons/                # Extension icons
│   ├── icon-48.png
│   └── icon-96.png
└── README.md            # This file
```

### Modifying Styles

Edit `styles.css` to change:
- Font size: `.enhanced-issue-number { font-size: 18px !important; }`
- Color: `.enhanced-issue-number { color: #1f883d !important; }`
- Weight: `.enhanced-issue-number { font-weight: 700 !important; }`

After changes, reload the extension in `about:debugging`.

### Debugging

1. Open `about:debugging#/runtime/this-firefox`
2. Find the extension and click **"Inspect"**
3. Use the console to view logs and errors
4. Check the "Content Scripts" tab to see where scripts are injected

## License

This extension is provided as-is for use on git.doit.wisc.edu. Feel free to modify and adapt for your needs.

## Support

For issues or questions:
- Check the browser console for errors
- Verify you're on the correct domain
- Ensure the extension is enabled in about:addons
