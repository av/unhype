import './style.css';
import { setupCounter } from '@/components/counter';
import { storedInput } from '@/components/stored-input';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="container">
    <h1>Un<span style="opacity: 0.2">hype</span></h1>

    <section>
      <label for="apiUrl">API URL</label>
      <input type="text" id="apiUrl" value="http://localhost:11434/v1" data-key="llm.apiUrl" />
    </section>

    <section>
      <label for="apiKey">API Key</label>
      <input type="text" id="apiKey" value="-" data-key="llm.apiKey" />
    </section>

    <section>
      <label for="model">Model ID</label>
      <input type="text" id="model" value="-" data-key="llm.model" />
    </section>

    <a href="https://github.com/av/unhype" target="_blank">GitHub</a>
  </div>
`;

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!);
storedInput(document.querySelector<HTMLInputElement>('#apiUrl')!);
storedInput(document.querySelector<HTMLInputElement>('#apiKey')!);
storedInput(document.querySelector<HTMLInputElement>('#model')!);