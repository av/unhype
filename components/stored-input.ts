import { storage } from '#imports';

export function storedInput(
  element: HTMLInputElement,
  defaultValue: string = ''
) {
  const storageKey = `local:${element.dataset.key}` as const
  const value = storage.defineItem<string>(storageKey);

  (async () => {
    const storedValue = await value.getValue();
    element.value = storedValue || defaultValue;
    await value.setValue(element.value);
  })();

  element.addEventListener('change', () => {
    value.setValue(element.value);
  });
}