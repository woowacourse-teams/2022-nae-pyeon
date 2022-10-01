import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { getRollingpaper } from "@/api/rollingpaper";

import { GetRollingpaperResponse } from "@/types/apiResponse";

interface UseReadRollingpaperArgs {
  teamId: number;
  rollingpaperId: number;
  handleWriteEnd: () => void;
}

export const useReadRollingpaper = ({
  teamId,
  rollingpaperId,
  handleWriteEnd,
}: UseReadRollingpaperArgs) =>
  useQuery<GetRollingpaperResponse, AxiosError>(
    ["rollingpaper", rollingpaperId],
    () => getRollingpaper({ teamId, id: rollingpaperId }),
    {
      useErrorBoundary: true,
      refetchOnWindowFocus: false,
      onSuccess: () => {
        handleWriteEnd();
      },
    }
  );
