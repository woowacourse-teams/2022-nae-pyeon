import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { getTeamWithInviteCode } from "@/api/team";
import { GetTeamResponse } from "@/types/apiResponse";
import useCheckTeamJoined from "./useCheckTeamJoined";

const useReadTeamDetailWithInviteCode = (inviteCode: string) => {
  const handleTeamDetailWithInviteCodeSuccess = useCheckTeamJoined();
  return useQuery<GetTeamResponse, AxiosError>(
    ["teamDetailWithInviteCode", inviteCode],
    () => getTeamWithInviteCode(inviteCode),
    {
      onSuccess: handleTeamDetailWithInviteCodeSuccess,
      useErrorBoundary: true,
    }
  );
};

export default useReadTeamDetailWithInviteCode;
