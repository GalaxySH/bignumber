// ==UserScript==
// @name         GitLab Issue Number Enhancement
// @namespace    https://git.doit.wisc.edu/
// @version      1.0.0
// @description  Makes GitLab issue numbers more prominent with GitHub-inspired styling
// @author       Your Name
// @match        https://git.doit.wisc.edu/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=wisc.edu
// @grant        GM_addStyle
// @run-at       document-end
// ==/UserScript==

(function() {
  'use strict';

  // Inject CSS styles
  const cssStyles = `
/* GitLab Issue Number Enhancement Styles */

/* Enhanced issue numbers - GitHub-inspired styling */
.enhanced-issue-number {
  font-size: 18px !important;
  font-weight: 700 !important;
  color: #1f883d !important;
  margin-right: 8px !important;
  display: inline-block !important;
  line-height: 1.2 !important;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
}

/* Make sure the issue number stands out in lists */
.issuable-reference.enhanced-issue-number,
.issue-token-reference.enhanced-issue-number {
  font-size: 18px !important;
  font-weight: 700 !important;
  color: #1f883d !important;
}

/* Issue board cards - keep inline to avoid layout breaks */
.board-card .enhanced-issue-number {
  font-size: 16px !important;
  font-weight: 700 !important;
  color: #1f883d !important;
  /* Don't change display property to avoid breaking layout */
}

/* Issue detail page title */
.title .enhanced-issue-number {
  font-size: 24px !important;
  font-weight: 700 !important;
  color: #1f883d !important;
  margin-right: 12px !important;
}

/* Hover effect for links */
a.enhanced-issue-number:hover {
  color: #166534 !important;
  text-decoration: underline !important;
}

/* Ensure visibility on dark backgrounds */
.gl-dark .enhanced-issue-number,
[data-theme="dark"] .enhanced-issue-number {
  color: #3fb950 !important;
}

.gl-dark a.enhanced-issue-number:hover,
[data-theme="dark"] a.enhanced-issue-number:hover {
  color: #7ee787 !important;
}

/* Enhanced title links with specific GitLab classes */
a.gl-text-sm.gl-font-bold.gl-text-default.gl-link.enhanced-issue-number,
a.gl-text-sm.gl-font-bold.gl-text-default.gl-link {
  font-size: 18px !important;
  font-weight: 700 !important;
}

/* Specific styling for issuable-reference spans with path */
span.issuable-reference[data-enhanced="true"] {
  font-size: inherit !important;
}

span.issuable-reference[data-enhanced="true"] .enhanced-issue-number {
  font-size: 18px !important;
  font-weight: 700 !important;
  color: #1f883d !important;
  display: inline !important;
}

/* Adjust vertical alignment for better aesthetics on issue boards */
.gl-align-bottom {
  vertical-align: top !important;
}
`;

  // Inject styles using GM_addStyle if available, otherwise create style element
  if (typeof GM_addStyle !== 'undefined') {
    GM_addStyle(cssStyles);
  } else {
    const style = document.createElement('style');
    style.textContent = cssStyles;
    document.head.appendChild(style);
  }

  // Selectors for issue number elements across different GitLab views
  const SELECTORS = [
    // Issues list page
    'span.issuable-reference',
    '.issuable-reference',
    '.issue-token-reference',
    '[data-testid="issuable-reference"]',
    // Issue board cards
    '.board-card-number',
    '.board-card .issue-id',
    // General issue references
    '.issue-id',
    '.gl-link.gl-text-secondary',
    // Issue title pages
    '.title .issue-id',
    // Issue title links
    'a.gl-text-sm.gl-font-bold.gl-text-default.gl-link'
  ];

  /**
   * Extract issue number from text (e.g., "project/path#123" -> "#123")
   */
  function extractIssueNumber(text) {
    const match = text.match(/#(\d+)$/);
    return match ? match[0] : null;
  }

  /**
   * Check if an element contains an issue number pattern (#1234)
   */
  function hasIssueNumber(element) {
    const text = element.textContent.trim();
    return /^#\d+$/.test(text) || /\s#\d+/.test(text) || /#\d+/.test(text);
  }

  /**
   * Enhance a single issue number element
   */
  function enhanceElement(element) {
    // Skip if already enhanced
    if (element.classList.contains('enhanced-issue-number')) {
      return;
    }

    const text = element.textContent.trim();

    // Case 1: Element text is exactly an issue number (e.g., "#123")
    if (/^#\d+$/.test(text)) {
      element.classList.add('enhanced-issue-number');
      return;
    }

    // Case 2: Element contains path with issue number (e.g., "project/path#123")
    if (/#\d+$/.test(text) && text.length > 5) {
      const issueNum = extractIssueNumber(text);
      if (issueNum) {
        // Split the text: everything before # and the issue number
        const pathPart = text.substring(0, text.lastIndexOf('#'));

        // Clear the element and rebuild with enhanced issue number
        element.textContent = '';

        // Add the path part as plain text
        const pathSpan = document.createElement('span');
        pathSpan.textContent = pathPart;
        element.appendChild(pathSpan);

        // Add the enhanced issue number
        const issueSpan = document.createElement('span');
        issueSpan.className = 'enhanced-issue-number';
        issueSpan.textContent = issueNum;
        element.appendChild(issueSpan);

        // Mark the parent as processed
        element.dataset.enhanced = 'true';
      }
      return;
    }

    // Case 3: Check if it contains an issue number with space
    if (/\s#\d+/.test(text)) {
      element.classList.add('enhanced-issue-number');
      return;
    }

    // Case 4: Check child text nodes for issue numbers
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );

    let node;
    while (node = walker.nextNode()) {
      const nodeText = node.textContent.trim();
      if (/^#\d+$/.test(nodeText)) {
        const span = document.createElement('span');
        span.className = 'enhanced-issue-number';
        span.textContent = nodeText;
        node.parentNode.replaceChild(span, node);
      }
    }
  }

  /**
   * Find and enhance all issue number elements
   */
  function enhanceIssueNumbers() {
    // Try each selector
    SELECTORS.forEach(selector => {
      try {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
          // Skip if already processed
          if (element.dataset.enhanced === 'true') {
            return;
          }
          enhanceElement(element);
        });
      } catch (e) {
        // Selector might not be valid in this context, skip it
        console.debug('Selector failed:', selector, e);
      }
    });

    // Also search for any element with issue number pattern
    const allLinks = document.querySelectorAll('a, span, div');
    allLinks.forEach(element => {
      if (element.classList.contains('enhanced-issue-number') || element.dataset.enhanced === 'true') {
        return; // Already processed
      }

      const text = element.textContent.trim();
      // Match issue numbers like #1234
      if (/^#\d+$/.test(text) && element.textContent.length < 20) {
        enhanceElement(element);
      }
    });
  }

  /**
   * Initialize the enhancement
   */
  function init() {
    // Initial enhancement
    enhanceIssueNumbers();

    // Watch for dynamic content changes (GitLab uses Vue.js)
    const observer = new MutationObserver((mutations) => {
      // Debounce: only process if there are actual node additions
      const hasNewNodes = mutations.some(mutation =>
        mutation.addedNodes.length > 0
      );

      if (hasNewNodes) {
        enhanceIssueNumbers();
      }
    });

    // Observe the main content area
    const contentArea = document.querySelector('body');
    if (contentArea) {
      observer.observe(contentArea, {
        childList: true,
        subtree: true
      });
    }

    // Re-run on navigation events (GitLab SPA navigation)
    window.addEventListener('popstate', () => {
      setTimeout(enhanceIssueNumbers, 100);
    });

    // Re-run periodically for any missed elements (fallback)
    setInterval(enhanceIssueNumbers, 2000);
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
