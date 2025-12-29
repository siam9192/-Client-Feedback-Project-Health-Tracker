"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { queryCache } from "@/utils/queryCache";

type UseQueryOptions = {
  enabled?: boolean;
  staleTime?: number;
};

export type UseQueryResult<T> = {
  data: T | null;
  isLoading: boolean;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: any;
  refetch: () => void;
};

function useQuery<T>(
  key: string,
  queryFn: () => Promise<T>,
  options: UseQueryOptions = {},
): UseQueryResult<T> {
  const { enabled = true, staleTime = 0 } = options;

  // 1. Keep a stable reference to the query function
  const queryFnRef = useRef(queryFn);
  useEffect(() => {
    queryFnRef.current = queryFn;
  }, [queryFn]);

  const [data, setData] = useState<T | null>(() => {
    const cached = queryCache.get(key);
    return cached ? cached.data : null;
  });

  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<any>(null);

  const isLoading = isFetching && !data;
  const isSuccess = !!data && !error;
  const isError = !!error;

  // 2. fetchData now only changes if 'key' changes
  const fetchData = useCallback(async () => {
    setIsFetching(true);
    setError(null);
    try {
      const result = await queryFnRef.current(); // Use the ref
      queryCache.set(key, result);
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setIsFetching(false);
    }
  }, [key]); // Removed queryFn from dependencies

  // 3. Handle Invalidation
  useEffect(() => {
    const unsubscribe = queryCache.subscribe((invalidatedKey) => {
      if (invalidatedKey === key) {
        fetchData();
      }
    });
    return () => unsubscribe();
  }, [key, fetchData]);

  // 4. Initial Mount / Stale Check
  useEffect(() => {
    if (!enabled) return;

    const cached = queryCache.get(key);
    const isExpired = !cached || Date.now() - cached.timestamp > staleTime;

    if (isExpired) {
      fetchData();
    }
  }, [enabled, key, staleTime, fetchData]);

  return {
    data,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
    refetch: fetchData,
  };
}

export default useQuery;
