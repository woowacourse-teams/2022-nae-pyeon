import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import useAutoCompleteInput from "@/hooks/useAutoCompleteInput";

import { getTeamMembers } from "@/api/team";

import { GetTeamMembersResponse } from "@/types/apiResponse";

<<<<<<< HEAD
const useReadTeamMembers = (teamId: number) => {
  const { setKeywordList } = useAutoCompleteInput();
  return useQuery<GetTeamMembersResponse, AxiosError>(
    ["team-member", teamId],
    () => getTeamMembers(+teamId),
    {
      onSuccess: (data: GetTeamMembersResponse) =>
        setKeywordList(data.members.map((member) => member.nickname)),

=======
const useReadTeamMembers = (teamId: number) =>
  useQuery<GetTeamMembersResponse, AxiosError>(
    ["team-member", teamId],
    () => getTeamMembers(+teamId),
    {
>>>>>>> 0ff32b774f5d192aff469385e9db78b2f3de9c0a
      useErrorBoundary: true,
    }
  );
};
export default useReadTeamMembers;
