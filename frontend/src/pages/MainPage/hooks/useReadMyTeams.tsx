import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { getMyTeams } from "@/api/team";
import { GetMyTeamsResponse } from "@/types/apiResponse";

import { MY_TEAM_COUNT } from "@/constants";

const useReadMyTeams = () => {
  return useQuery<GetMyTeamsResponse, AxiosError>(
    ["myTeams", 0],
    getMyTeams(MY_TEAM_COUNT)
  );
};

export default useReadMyTeams;
