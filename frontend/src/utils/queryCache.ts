type CacheEntry = {
  data: any;
  timestamp: number;
};

const cache = new Map<string, CacheEntry>();

export const queryCache = {
  get(key: string) {
    return cache.get(key);
  },
  set(key: string, data: any) {
    cache.set(key, { data, timestamp: Date.now() });
  },
  invalidate(key: string[]) {
    key.forEach((k) => cache.delete(k));
  },
  clear() {
    cache.clear();
  },
};
