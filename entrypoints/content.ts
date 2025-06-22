import { browser } from '#imports';

export default defineContentScript({
  matches: ['<all_urls>'],
  main() {
    function debounce(func: Function, wait: number) {
      let timeout: ReturnType<typeof setTimeout>;
      return function executedFunction(...args: any[]) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    }

    // Function to highlight all headers
    async function highlightHeaders() {
      // Select all header elements (h1-h6)
      const targets = [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        '[role="heading"]',
        '.header',
        '.lead-headline > a',
        '.ui-story-headline',
        '[data-testid="card-part-title"]',
        '.title',
        '.article-title',
        '.desc_container',
      ].map((s) => `${s}:not([unhyped="true"])`).join(', ')
      const headers = document.querySelectorAll(targets);

      await Promise.all(
        Array.from(headers).map((header) => {
          const hel = header as HTMLElement;
          const content = (hel).innerText.trim();

          const init = () => {
            (hel).style.filter = 'blur(2px)';
          }

          const finalise = () => {
            (hel).style.filter = 'none';
            (hel).setAttribute('unhyped', 'true');
          }

          if (content.length < 10) {
            return finalise();
          }

          if (content.split(' ').length < 3) {
            return finalise();
          }

          init();

          return browser.runtime.sendMessage({
            type: 'unhype-request',
            content: (hel).innerText
          })
            .then(({ status, content }) => {
              if (status === 'success') {
                (hel).innerText = content;
              }
            })
            .finally(finalise);
        })
      )
    }

    // Run immediately if DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', highlightHeaders);
    } else {
      highlightHeaders();
    }

    // Optional: Re-highlight if new content is dynamically added
    const observer = new MutationObserver(debounce(() => {
      highlightHeaders();
    }, 1000));

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  },
});
