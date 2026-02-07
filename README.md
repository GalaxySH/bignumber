# GitLab Issue Number Enhancement

A userscript that makes GitLab issue numbers more prominent on git.doit.wisc.edu, similar to GitHub's design.

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

## Visual Enhancements Summary

| Location | Font Size | Color | Weight | Special |
|----------|-----------|-------|--------|---------|
| General | 18px | #1f883d | 700 | +8px margin-right |
| Issue Boards | 16px | #1f883d | 700 | Inline (no layout break) |
| Issue Title | 24px | #1f883d | 700 | +12px margin-right |
| Dark Mode | 18px | #3fb950 | 700 | Lighter green |
| Hover (Light) | 18px | #166534 | 700 | Underlined |
| Hover (Dark) | 18px | #7ee787 | 700 | Underlined |

## Installation

### Step 1: Install a Userscript Manager

You need a userscript manager extension for your browser. Choose one:

**For Firefox:**
- [Tampermonkey](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/) (Recommended)
- [Violentmonkey](https://addons.mozilla.org/en-US/firefox/addon/violentmonkey/)
- [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/)

**For Chrome/Edge:**
- [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/)
- [Violentmonkey](https://chrome.google.com/webstore/detail/violentmonkey/)

### Step 2: Install the Userscript

**Option A: Direct Installation (If you have the file)**
1. Open `content.js` in a text editor
2. Copy the entire contents
3. Open your userscript manager dashboard (click the extension icon → Dashboard)
4. Create a new script
5. Paste the content and save

**Option B: Click-to-Install (If hosted)**
1. Click on the `content.js` file (if it has a `.user.js` extension)
2. Your userscript manager will prompt you to install it
3. Click "Install"

**Option C: Manual Installation**
1. Click on your userscript manager icon in the browser toolbar
2. Select "Create a new script" or "Add new script"
3. Replace the default template with the contents of `content.js`
4. Save (Ctrl+S or Cmd+S)

## Usage

Once installed, the userscript works automatically:

1. Visit any page on `git.doit.wisc.edu`
2. Issue numbers will automatically be enhanced with:
   - Larger font size (18px)
   - Bold weight
   - Green color (#1f883d)
   - Better spacing

No configuration needed - it just works!

## Testing

To verify the userscript is working:

1. Navigate to an issues list: `https://git.doit.wisc.edu/[project]/issues`
2. Check that issue numbers (e.g., #123) are displayed in larger, green, bold text
3. Open an issue board: `https://git.doit.wisc.edu/[project]/boards`
4. Verify that issue numbers on cards are enhanced
5. Open the browser console (F12) - there should be no errors

## Troubleshooting

**Issue numbers not enhanced:**
- Check that you're on git.doit.wisc.edu (userscript only works there)
- Verify the userscript is enabled in your userscript manager
- Open browser console (F12) and look for JavaScript errors
- Try refreshing the page

**Userscript not loading:**
- Verify your userscript manager extension is installed and enabled
- Check the userscript is enabled in the manager's dashboard
- Ensure the `@match` directive matches your GitLab URL

**Dark mode colors wrong:**
- Userscript should automatically detect dark mode
- If not, check GitLab's theme attribute on the body element

## Privacy & Security

- **No network permissions** - Userscript cannot make any network requests
- **No data collection** - No analytics, tracking, or data collection
- **Domain-restricted** - Only runs on git.doit.wisc.edu
- **Open source** - All code is visible and auditable

## Technical Details

- **Type:** Userscript (Greasemonkey/Tampermonkey compatible)
- **Permissions:** GM_addStyle (for CSS injection)
- **Execution:** Runs at document-end for optimal performance
- **Dynamic Content:** Uses MutationObserver for Vue.js/SPA navigation

## Development

### Project Structure

```
bignumber/
├── content.js            # Userscript with embedded CSS
├── manifest.json         # (Legacy - kept for posterity)
├── styles.css            # (Legacy - kept for posterity)
├── icons/                # (Legacy - kept for posterity)
│   ├── icon-48.png
│   └── icon-96.png
├── INSTALL.txt           # (Legacy - kept for posterity)
└── README.md            # This file
```

**Note:** The `manifest.json`, `styles.css`, `icons/`, and `INSTALL.txt` files are from the original browser extension version and are kept for historical purposes. They are not used by the userscript.

### Modifying Styles

Edit the `cssStyles` constant in `content.js` to change:
- Font size: `.enhanced-issue-number { font-size: 18px !important; }`
- Color: `.enhanced-issue-number { color: #1f883d !important; }`
- Weight: `.enhanced-issue-number { font-weight: 700 !important; }`

After changes, save the file in your userscript manager and reload the GitLab page.

### Debugging

1. Open your browser's developer console (F12)
2. Navigate to git.doit.wisc.edu
3. Look for any JavaScript errors
4. Check that elements with class `enhanced-issue-number` are being created
5. Use your userscript manager's built-in debugger if available

## Converting Back to Browser Extension

If you need the browser extension version:
1. The original extension files are preserved in this repository
2. Use `manifest.json` and `styles.css` as separate files
3. See the git history for the original extension structure

## License

This userscript is provided as-is for use on git.doit.wisc.edu. Feel free to modify and adapt for your needs.

## Support

For issues or questions:
- Check the browser console for errors
- Verify you're on the correct domain
- Ensure the userscript is enabled in your userscript manager
- Check that your userscript manager extension is up to date
