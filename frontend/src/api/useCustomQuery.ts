import { useQuery } from "@tanstack/react-query";

import { QueryOptions } from "@/types/api";

type QueryKey = readonly unknown[];

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
