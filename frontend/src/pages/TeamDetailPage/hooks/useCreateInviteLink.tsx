import React from "react";
import { useMutation } from "@tanstack/react-query";

import { postTeamInviteCode } from "@/api/team";

import { Team } from "@/types";
import { PostTeamWithInviteCodeResponse } from "@/types/apiResponse";
import { AxiosError } from "axios";

type CreateInviteLinkVariable = Team["id"];

const useCreateInviteLink = () => {
  const {
    mutate: createInviteLink,
    isError,
    data,
  } = useMutation<
    PostTeamWithInviteCodeResponse,
    AxiosError,
    CreateInviteLinkVariable
  >((id) => postTeamInviteCode(id), {});

  return { createInviteLink, isError, data };
};

export default useCreateInviteLink;
