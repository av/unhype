import { storage } from '#imports';

export function storedInput(
  element: HTMLInputElement,
) {
  const storageKey = `local:${element.dataset.key}` as const
  const value = storage.defineItem<string>(storageKey);

  (async () => {
    const storedValue = await value.getValue();

    if (storedValue !== undefined) {
      element.value = storedValue;
    } else {
      await value.setValue(element.value);
    }
  })();

  element.addEventListener('change', async () => {
    await value.setValue(element.value);
  });
}