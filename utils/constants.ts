export const LLM_STATUS_LABEL = {
  CHECKING: 'Checking...',
  READY: '✓',
  ERROR: '✗',
} as const;

export const STORAGE_KEYS = {
  LLM_API_URL: 'local:llm.apiUrl',
  LLM_API_KEY: 'local:llm.apiKey',
  LLM_MODEL: 'local:llm.model',
  SELECTORS: 'local:selectors',
} as const;

export const DEFAULT_SELECTORS = [
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
] as const;