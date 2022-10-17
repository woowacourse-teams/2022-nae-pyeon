import { useMutation } from "@tanstack/react-query";

import { postTeamInviteCode } from "@/api/team";

import { Team } from "@/types";
import { PostTeamWithInviteCodeResponse } from "@/types/apiResponse";
import { AxiosError } from "axios";

type CreateInviteLinkVariables = Team["id"];

const useCreateInviteLink = () => {
  const {
    mutate: createInviteLink,
    isError,
    data,
  } = useMutation<
    PostTeamWithInviteCodeResponse,
    AxiosError,
    CreateInviteLinkVariables
  >((id) => postTeamInviteCode(id), {});

  return { createInviteLink, isError, data };
};

export default useCreateInviteLink;
