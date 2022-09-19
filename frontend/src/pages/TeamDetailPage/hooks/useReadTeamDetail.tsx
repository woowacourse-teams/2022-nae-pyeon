import useCustomQuery from "@/api/useCustomQuery";
import { getTeam } from "@/api/team";

import { QueryOptions } from "@/types/api";
import { GetTeamResponse } from "@/types/apiResponse";

const useReadTeamDetail = (teamId: number, options?: QueryOptions) =>
  useCustomQuery<GetTeamResponse>(["team", teamId], () => getTeam(teamId), {
    ...options,
  });

export default useReadTeamDetail;
