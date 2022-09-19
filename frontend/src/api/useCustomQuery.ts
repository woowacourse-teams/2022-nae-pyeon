import { useQuery } from "@tanstack/react-query";

type QueryKey = readonly unknown[];

interface QueryOptions {
  onError?: () => void;
  onSuccess?: () => void;
}

export default function useCustomQuery<T>(
  queryKey: QueryKey,
  queryFn: any,
  options?: QueryOptions
) {
  return useQuery<T>(queryKey, queryFn, {
    ...options,
    useErrorBoundary: !options?.onError,
  });
}
