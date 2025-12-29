type CacheEntry = { data: any; timestamp: number };
const cache = new Map<string, CacheEntry>();
const listeners = new Set<(key: string) => void>(); // Track subscribers

export const queryCache = {
  get(key: string) {
    return cache.get(key);
  },
  set(key: string, data: any) {
    cache.set(key, { data, timestamp: Date.now() });
  },
  invalidate(keys: string[]) {
    keys.forEach((k) => {
      cache.delete(k);
      listeners.forEach((l) => l(k));
    });
  },

  subscribe(callback: (key: string) => void) {
    listeners.add(callback);
    return () => {
      listeners.delete(callback);
    };
  },
  clear() {
    cache.clear();
  },
};
