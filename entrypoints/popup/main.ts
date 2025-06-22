import { llmIndicator } from '@/components/llm-indicator';
import './style.css';

import { storedInput } from '@/components/stored-input';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="container">
    <h1>Un<span style="opacity: 0.2">hype</span></h1>

    <section id="status">
    ...
    </section>

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