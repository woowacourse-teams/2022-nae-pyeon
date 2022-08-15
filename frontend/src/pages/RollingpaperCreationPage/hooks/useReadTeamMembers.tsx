import React from "react";
import { useQuery } from "@tanstack/react-query";

import { getTeamMembers } from "@/api/team";

interface TeamMember {
  id: number;
  nickname: string;
}

interface ResponseTeamMember {
  members: TeamMember[];
}

export const useReadTeamMembers = (
  teamId: number,
  setKeywordList: React.Dispatch<React.SetStateAction<string[]>>
) => {
  return useQuery<ResponseTeamMember>(
    ["team-member", teamId],
    () => getTeamMembers(+teamId),
    {
      onSuccess: (data) => {
        setKeywordList(data.members.map((member) => member.nickname));
      },
    }
  );
};
