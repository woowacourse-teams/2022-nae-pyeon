import React from "react";
import { useQuery } from "@tanstack/react-query";

import { getTeamMembers } from "@/api/team";

interface UseReadTeamMembersArgs {
  teamId: number;
  onSuccess: (data: ResponseTeamMember) => void;
}
interface TeamMember {
  id: number;
  nickname: string;
}

interface ResponseTeamMember {
  members: TeamMember[];
}

const useReadTeamMembers = ({ teamId, onSuccess }: UseReadTeamMembersArgs) => {
  return useQuery<ResponseTeamMember>(
    ["team-member", teamId],
    () => getTeamMembers(+teamId),
    {
      onSuccess,
    }
  );
};

export default useReadTeamMembers;
