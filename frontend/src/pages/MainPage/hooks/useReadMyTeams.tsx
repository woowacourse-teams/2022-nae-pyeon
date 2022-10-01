import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { getMyTeams } from "@/api/team";
import { GetMyTeamsResponse } from "@/types/apiResponse";

const useReadMyTeams = () => {
  return useQuery<GetMyTeamsResponse, AxiosError>(
    ["myTeams", 0],
    getMyTeams(5),
    {
      useErrorBoundary: true,
    }
  );
};

export default useReadMyTeams;
