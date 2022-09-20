import React from "react";
import { useMutation } from "@tanstack/react-query";

import { postTeamInviteToken } from "@/api/team";

import { Team } from "@/types";
import { PostTeamInviteTokenResponse } from "@/types/apiResponse";
import { AxiosError } from "axios";

const useCreateInviteLink = () => {
  const {
    mutate: createInviteLink,
    isError,
    data,
  } = useMutation<PostTeamInviteTokenResponse, AxiosError, Team["id"]>(
    (id) => postTeamInviteToken(id),
    {
      useErrorBoundary: true,
    }
  );

  return { createInviteLink, isError, data };
};

export default useCreateInviteLink;
