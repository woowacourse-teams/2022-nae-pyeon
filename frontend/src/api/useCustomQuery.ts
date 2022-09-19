import { useQuery } from "@tanstack/react-query";

import { QueryOptions } from "@/types/api";
import { AxiosError } from "axios";

type QueryKey = readonly unknown[];

export default function useCustomQuery<T>(
  queryKey: QueryKey,
  queryFn: () => Promise<any>,
  options?: QueryOptions
) {
  return useQuery<T, AxiosError>(queryKey, queryFn, {
    ...options,
    useErrorBoundary: !options?.onError,
  });
}
