import React from "react";
import { useQuery } from "@tanstack/react-query";

import { getTeamMembers } from "@/api/team";

import { TeamMember } from "@/types";

interface UseReadTeamMembersArgs {
  teamId: number;
  onSuccess: (data: ResponseTeamMember) => void;
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
