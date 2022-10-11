import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { getTeamMyNickname } from "@/api/team";

import { GetTeamMyNicknameResponse } from "@/types/apiResponse";

const useReadTeamNickname = (teamId: number) =>
  useQuery<GetTeamMyNicknameResponse, AxiosError>(
    ["team-nickname", teamId],
    () => getTeamMyNickname(teamId)
  );

export default useReadTeamNickname;
