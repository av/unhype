import './style.css';

import { storedInput } from '@/components/stored-input';
import { llmIndicator } from '@/components/llm-indicator';
import { selectorsEditor } from '@/components/selectors-editor';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="container">
    <h1>Un<span style="opacity: 0.2">hype</span></h1>

    <h3>LLM<span> <span><span id="status">?</span></h3>

    <section>
      <label for="apiUrl">API URL</label>
      <input type="text" id="apiUrl" />
    </section>

    <section>
      <label for="apiKey">API Key</label>
      <input type="password" id="apiKey" />
    </section>

    <section>
      <label for="model">Model ID</label>
      <input type="text" id="model" />
    </section>

    <h3>Selectors</h3>

    <section id="selectors">
    </section>

    <a href="https://github.com/av/unhype" target="_blank">GitHub</a>
  </div>
`;

storedInput({
  element: document.querySelector<HTMLInputElement>('#apiUrl')!,
  defaultValue: 'http://localhost:11434/v1',
  storageKey: STORAGE_KEYS.LLM_API_URL,
});

storedInput({
  element: document.querySelector<HTMLInputElement>('#apiKey')!,
  defaultValue: 'sk-ollama',
  storageKey: STORAGE_KEYS.LLM_API_KEY,
});

storedInput({
  element: document.querySelector<HTMLInputElement>('#model')!,
  defaultValue: 'llama3.2:3b-instruct-q8_0',
  storageKey: STORAGE_KEYS.LLM_MODEL,
});

llmIndicator(document.querySelector<HTMLElement>('#status')!);

selectorsEditor({
  element: document.querySelector<HTMLElement>('#selectors')!,
})