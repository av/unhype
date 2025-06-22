import { storage } from '#imports';

export function llmIndicator(
  element: HTMLElement
) {
  async function setStatus(status: keyof typeof LLM_STATUS_LABEL) {
    element.textContent = `${LLM_STATUS_LABEL[status]}`;
    element.classList.remove('CHECKING')
    element.classList.remove('READY')
    element.classList.remove('ERROR')
    element.classList.add(status);
  }

  async function check() {
    try {
      await setStatus('CHECKING');

      browser.runtime.sendMessage({
        type: 'unhype-request',
        content: 'Why You Should Stop Eating and do THIS instead'
      })
        .then(({
          status,
          content,
        }) => {
          if (status === 'success') {
            element.title = 'Everything is set up correctly';
            return setStatus('READY');
          } else {
            element.title = `Something went wrong: ${content}`;
            return setStatus('ERROR');
          }
        });
    } catch (error) {
      console.error(error);
    }
  }

  const debounceCheck = debounce(check, 500);

  [
    STORAGE_KEYS.LLM_API_URL,
    STORAGE_KEYS.LLM_API_KEY,
    STORAGE_KEYS.LLM_MODEL
  ]
    .forEach((k) => {
      storage.watch(k, debounceCheck);
    });

  debounceCheck();
}

