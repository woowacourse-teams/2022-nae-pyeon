import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import useAutoCompleteInput from "@/hooks/useAutoCompleteInput";

import { getTeamMembers } from "@/api/team";

import { GetTeamMembersResponse } from "@/types/apiResponse";

const useReadTeamMembers = (teamId: number) => {
  const { setKeywordList } = useAutoCompleteInput();
  return useQuery<GetTeamMembersResponse, AxiosError>(
    ["team-member", teamId],
    () => getTeamMembers(+teamId),
    {
      onSuccess: (data: GetTeamMembersResponse) =>
        setKeywordList(data.members.map((member) => member.nickname)),
      useErrorBoundary: true,
    }
  );
};
export default useReadTeamMembers;
