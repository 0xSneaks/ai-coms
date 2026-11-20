/** Tiny key-value store so ledger tests can run without a browser. */
export interface KV {
  get(key: string): string | null;
  set(key: string, value: string): void;
}

export function memoryKV(): KV {
  const m = new Map<string, string>();
  return {
    get: (k) => m.get(k) ?? null,
    set: (k, v) => {
      m.set(k, v);
    },
  };
}

export function localKV(): KV {
  return {
    get: (k) => (typeof localStorage === 'undefined' ? null : localStorage.getItem(k)),
    set: (k, v) => {
      if (typeof localStorage !== 'undefined') localStorage.setItem(k, v);
    },
  };
}
