import { useMutation } from "@tanstack/react-query";

import { MutationOptions } from "@/types/api";
import { AxiosError } from "axios";

export default function useCustomMutation<T, D>(
  queryFn: (data: any) => Promise<any>,
  options?: MutationOptions
) {
  return useMutation<T, AxiosError, D>(queryFn, {
    ...options,
    useErrorBoundary: !options?.onError,
  });
}
