import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { getRollingpaper } from "@/api/rollingpaper";

import { QueryOptions } from "@/types/api";
import { GetRollingpaperResponse } from "@/types/apiResponse";

interface UseReadRollingpaperArgs extends QueryOptions {
  teamId: number;
  rollingpaperId: number;
}

export const useReadRollingpaper = (
  { teamId, rollingpaperId }: UseReadRollingpaperArgs,
  options?: QueryOptions
) =>
  useQuery<GetRollingpaperResponse, AxiosError>(
    ["rollingpaper", rollingpaperId],
    () => getRollingpaper({ teamId, id: rollingpaperId }),
    { useErrorBoundary: !options?.onError, ...options }
  );
