import useCustomQuery from "@/api/useCustomQuery";
import { QueryOptions } from "@/types/api";

import { getTeamMyNickname } from "@/api/team";
import { GetTeamMyNicknameResponse } from "@/types/apiResponse";

const useReadTeamNickname = (teamId: number, options?: QueryOptions) =>
  useCustomQuery<GetTeamMyNicknameResponse>(
    ["team-nickname", teamId],
    () => getTeamMyNickname(teamId),
    {
      ...options,
    }
  );

export default useReadTeamNickname;
