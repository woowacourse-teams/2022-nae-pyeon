import { useInfiniteQuery } from "@tanstack/react-query";

import { getMyTeams } from "@/api/team";
import { GetMyTeamsResponse } from "@/types/apiResponse";
import { MY_TEAM_COUNT } from "@/constants";

const useReadMyTeams = () =>
  useInfiniteQuery<GetMyTeamsResponse>(
    ["my-teams"],
    getMyTeams(MY_TEAM_COUNT),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.currentPage * MY_TEAM_COUNT < lastPage.totalCount) {
          return lastPage.currentPage + 1;
        }
      },
    }
  );

export default useReadMyTeams;
