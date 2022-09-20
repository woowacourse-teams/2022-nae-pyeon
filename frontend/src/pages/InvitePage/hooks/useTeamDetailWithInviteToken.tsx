import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { getTeamWithInviteToken } from "@/api/team";
import { GetTeamResponse } from "@/types/apiResponse";
import useCheckTeamJoined from "./useCheckTeamJoined";

const useTeamDetailWithInviteToken = (inviteToken: string) => {
<<<<<<< HEAD
  const handleTeamDetailWithInviteTokenSuccess = useCheckTeamJoined();
  return useQuery<GetTeamResponse, AxiosError>(
    ["teamDetailWithInviteToken", inviteToken],
    () => getTeamWithInviteToken(inviteToken),
    {
      onSuccess: handleTeamDetailWithInviteTokenSuccess,
      useErrorBoundary: true,
    }
=======
  return useQuery<GetTeamResponse, AxiosError>(
    ["teamDetailWithInviteToken", inviteToken],
    () => getTeamWithInviteToken(inviteToken),
    { useErrorBoundary: true }
>>>>>>> 0ff32b774f5d192aff469385e9db78b2f3de9c0a
  );
};

export default useTeamDetailWithInviteToken;
