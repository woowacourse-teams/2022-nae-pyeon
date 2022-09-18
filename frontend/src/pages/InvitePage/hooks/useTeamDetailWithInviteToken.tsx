import { useQuery } from "@tanstack/react-query";

import { getTeamWithInviteToken } from "@/api/team";

import { Team } from "@/types";

type UseTeamDetailWithInviteTokenArgs = {
  inviteToken: string;
  onSuccess?: (data: Team) => void;
  onError?: (err: unknown) => void;
};

const useTeamDetailWithInviteToken = ({
  inviteToken,
  onSuccess,
  onError,
}: UseTeamDetailWithInviteTokenArgs) => {
  return useQuery(
    ["teamDetailWithInviteToken", inviteToken],
    () => getTeamWithInviteToken(inviteToken),
    { onSuccess, onError }
  );
};

export default useTeamDetailWithInviteToken;
