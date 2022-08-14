import React from "react";
import { useQuery } from "@tanstack/react-query";

import { getTeamWithInviteToken } from "@/api/team";

import { Team } from "@/types";

type RequestTeamDetailWithInviteToken = {
  inviteToken: string;
};

const useTeamDetailWithInviteToken = ({
  inviteToken,
}: RequestTeamDetailWithInviteToken) => {
  return useQuery<Team>(
    ["teamDetailWithInviteToken", inviteToken],
    () => getTeamWithInviteToken(inviteToken),
    {
      enabled: !!inviteToken,
    }
  );
};

export default useTeamDetailWithInviteToken;
