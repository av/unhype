import { storage } from '#imports';

export function selectorsEditor({
  element,
}: {
  element: HTMLElement;
}) {
  if (!(element instanceof HTMLElement)) {
    throw new Error('element must be an instance of HTMLElement');
  }

  const value = storage.defineItem<string[]>('local:selectors');
  let selectors: string[] = [];

  async function loadSelectors() {
    const storedSelectors = await value.getValue();
    selectors = storedSelectors || [
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
      '[slot="title"]',
    ];
    render();
  }

  function render() {
    element.innerHTML = [
      `<a href="#" class="reset">Reset</a>`,
      ...selectors.map(
        (selector, index) => `
        <div class="selector" data-index="${index}">
          <input type="text" value='${selector}' data-index="${index}" />
          <button class="remove-control" data-index="${index}">⛌</button>
        </div>
      `
      ),
      `<button class="add-control">Add new</button>`
    ].join('');

    bindEvents();
  }

  function bindEvents() {
    element.querySelectorAll('input[data-index]').forEach((input) => {
      const index = parseInt(input.getAttribute('data-index')!);
      input.addEventListener('input', (e) => {
        const target = e.target as HTMLInputElement;
        selectors[index] = target.value;
        value.setValue(selectors);
      });
    });

    element.querySelectorAll('.remove-control').forEach((button) => {
      const index = parseInt(button.getAttribute('data-index')!);
      button.addEventListener('click', () => {
        selectors.splice(index, 1);
        value.setValue(selectors);
        render();
      });
    });

    element.querySelector('.reset')?.addEventListener('click', () => {
      selectors = [...DEFAULT_SELECTORS];
      value.setValue(selectors);
      render();
    });

    element.querySelector('.add-control')?.addEventListener('click', () => {
      selectors.push('');
      value.setValue(selectors);
      render();
    });
  }

  loadSelectors();
}