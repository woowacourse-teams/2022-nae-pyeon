import { getRollingpaper } from "@/api/rollingpaper";
import useCustomQuery from "@/api/useCustomQuery";

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
  useCustomQuery<GetRollingpaperResponse>(
    ["rollingpaper", rollingpaperId],
    () => getRollingpaper({ teamId, id: rollingpaperId }),
    { ...options }
  );
