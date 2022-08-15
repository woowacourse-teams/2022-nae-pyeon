import React from "react";
import { useQuery } from "@tanstack/react-query";

import { getTeamWithInviteToken } from "@/api/team";

import { Team } from "@/types";

type UseTeamDetailWithInviteTokenArgs = {
  inviteToken: string;
  onSuccess?: ((data: Team) => void) | undefined;
  onError?: ((err: unknown) => void) | undefined;
};

const useTeamDetailWithInviteToken = ({
  inviteToken,
  onSuccess,
  onError,
}: UseTeamDetailWithInviteTokenArgs) => {
  return useQuery<Team>(
    ["teamDetailWithInviteToken", inviteToken],
    () => getTeamWithInviteToken(inviteToken),
    { onSuccess, onError }
  );
};

export default useTeamDetailWithInviteToken;
