export const LLM_STATUS_LABEL = {
  CHECKING: 'Checking...',
  READY: '✓',
  ERROR: '✗',
} as const;

export const STORAGE_KEYS = {
  LLM_API_URL: 'local:llm.apiUrl',
  LLM_API_KEY: 'local:llm.apiKey',
  LLM_MODEL: 'local:llm.model',
} as const;