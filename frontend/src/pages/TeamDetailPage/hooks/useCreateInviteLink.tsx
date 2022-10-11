import React from "react";
import { useMutation } from "@tanstack/react-query";

import { postTeamInviteToken } from "@/api/team";

import { Team } from "@/types";
import { PostTeamWithInviteTokenResponse } from "@/types/apiResponse";
import { AxiosError } from "axios";

type CreateInviteLinkVariable = Team["id"];

const useCreateInviteLink = () => {
  const {
    mutate: createInviteLink,
    isError,
    data,
  } = useMutation<
    PostTeamWithInviteTokenResponse,
    AxiosError,
    CreateInviteLinkVariable
  >((id) => postTeamInviteToken(id), {});

  return { createInviteLink, isError, data };
};

export default useCreateInviteLink;
