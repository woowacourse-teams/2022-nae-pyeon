import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { getRollingpaper } from "@/api/rollingpaper";

import { GetRollingpaperResponse } from "@/types/apiResponse";

interface UseReadRollingpaperParams {
  teamId: number;
  rollingpaperId: number;
}

const useReadRollingpaper = ({
  teamId,
  rollingpaperId,
}: UseReadRollingpaperParams) =>
  useQuery<GetRollingpaperResponse, AxiosError>(
    ["rollingpaper", rollingpaperId],
    () => getRollingpaper({ teamId, id: rollingpaperId })
  );

export default useReadRollingpaper;
