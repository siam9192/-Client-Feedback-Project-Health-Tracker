"use client";
import { useState, useEffect, useCallback } from "react";
import { queryCache } from "@/utils/queryCache";

type UseQueryOptions = {
  enabled?: boolean;
  staleTime?: number;
};
export type UseQueryResult<T> = {
  data: T | null;
  isLoading: boolean;
  isRefetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: any;
  refetch: () => void;
  refetchAsync: () => Promise<void>;
};
function useQuery<T>(
  key: string,
  queryFn: () => Promise<T>,
  options: UseQueryOptions = {}
): UseQueryResult<T> {
  const { enabled = true, staleTime = 0 } = options;

  const [data, setData] = useState<T | null>(() => {
    const cached = queryCache.get(key);
    if (cached && Date.now() - cached.timestamp < staleTime) return cached.data;
    return null;
  });
  const [isLoading, setIsLoading] = useState(enabled && !data);
  const [isRefetching, setIsRefetching] = useState(false);
  const [error, setError] = useState<any>(null);

  const isSuccess = !!data && !error;
  const isError = !!error;

  const fetchData = useCallback(
    async (manual = false) => {
      if (manual) setIsRefetching(true);
      else setIsLoading(true);
      setError(null);

      try {
        const cached = queryCache.get(key);
        if (!manual && cached && Date.now() - cached.timestamp < staleTime) {
          setData(cached.data);
          return;
        }

        const result = await queryFn();
        queryCache.set(key, result);
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        if (manual) setIsRefetching(false);
        else setIsLoading(false);
      }
    },
    [key, queryFn, staleTime]
  );

  // on mount or enabled change
  useEffect(() => {
    if (enabled) fetchData();
  }, [enabled, fetchData]);

  return {
    data,
    isLoading,
    isRefetching,
    isSuccess,
    isError,
    error,
    refetch: () => fetchData(true),
    refetchAsync: () => fetchData(true),
  };
}

export default useQuery;