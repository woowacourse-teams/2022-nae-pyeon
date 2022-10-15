import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { getTeamRollingpapers } from "@/api/team";

import { GetTeamRollingpapersResponse } from "@/types/apiResponse";
import { GetTeamRollingpapersRequest } from "@/types/apiRequest";

const useReadTeamRollingpaper = ({
  id,
  order,
  filter,
}: GetTeamRollingpapersRequest) =>
  useQuery<GetTeamRollingpapersResponse, AxiosError>(
    ["rollingpaperList", id],
    () => getTeamRollingpapers({ id, order, filter })
  );

export default useReadTeamRollingpaper;
