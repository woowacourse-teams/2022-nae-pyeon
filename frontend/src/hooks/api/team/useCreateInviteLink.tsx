import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { postTeamInviteCode } from "@/api/team";

import { PostTeamInviteCodeResponse } from "@/types/apiResponse";
import { PostTeamInviteCodeRequest } from "@/types/apiRequest";

const useCreateInviteLink = () => {
  return useMutation<
    PostTeamInviteCodeResponse,
    AxiosError,
    PostTeamInviteCodeRequest
  >(({ id }) => postTeamInviteCode({ id }), {});
};

export default useCreateInviteLink;
