import { storage } from '#imports';

export function storedInput({
  element,
  defaultValue = '',
  storageKey,
  maskable = false
}: {
  element: HTMLInputElement,
  defaultValue: string,
  storageKey: StorageItemKey,
  maskable?: boolean
}) {
  if (storageKey === undefined) {
    throw new Error('storageKey is required');
  }

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