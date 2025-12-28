"use client";
import { queryCache } from "@/utils/queryCache";
import { useState } from "react";

type MutateOptions<TData> = {
  onSuccess?: (data: TData) => void;
  onError?: (error: any) => void;
  invalidateKeys?: string[];
};

function useMutation<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  baseOptions?: MutateOptions<TData>,
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const mutate = async (variables: TVariables, options?: MutateOptions<TData>) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await mutationFn(variables);

      const finalOptions = { ...baseOptions, ...options };

      finalOptions.invalidateKeys?.forEach((key) => queryCache.invalidate([key]));

      finalOptions.onSuccess?.(data);

      return data;
    } catch (err: any) {
      setError(err);

      const finalOptions = { ...baseOptions, ...options };
      finalOptions.onError?.(err);

      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    mutate,
    isLoading,
    error,
  };
}

export default useMutation;
