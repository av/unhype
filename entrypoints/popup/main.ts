import './style.css';
import { setupCounter } from '@/components/counter';
import { storedInput } from '@/components/stored-input';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Unhype</h1>
    <input type="text" id="apiUrl" value="http://localhost:11434/v1" data-key="llm.apiUrl" />
    <input type="text" id="apiKey" value="-" data-key="llm.apiKey" />
    <input type="text" id="model" value="-" data-key="llm.model" />
    <a href="https://github.com/av/unhype" target="_blank">GitHub</a>
  </div>
`;

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!);
storedInput(document.querySelector<HTMLInputElement>('#apiUrl')!);
storedInput(document.querySelector<HTMLInputElement>('#apiKey')!);
storedInput(document.querySelector<HTMLInputElement>('#model')!);