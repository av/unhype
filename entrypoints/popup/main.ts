import './style.css';
import { setupCounter } from '@/components/counter';
import { storedInput } from '@/components/stored-input';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="container">
    <h1>Un<span style="opacity: 0.2">hype</span></h1>

    <section>
      <label for="apiUrl">API URL</label>
      <input type="text" id="apiUrl" data-key="llm.apiUrl" />
    </section>

    <section>
      <label for="apiKey">API Key</label>
      <input type="text" id="apiKey" data-key="llm.apiKey" />
    </section>

    <section>
      <label for="model">Model ID</label>
      <input type="text" id="model" data-key="llm.model" />
    </section>

    <a href="https://github.com/av/unhype" target="_blank">GitHub</a>
  </div>
`;

storedInput(document.querySelector<HTMLInputElement>('#apiUrl')!, 'http://localhost:11434/v1');
storedInput(document.querySelector<HTMLInputElement>('#apiKey')!, 'sk-ollama');
storedInput(document.querySelector<HTMLInputElement>('#model')!, 'llama3.2:3b-instruct-q8_0');