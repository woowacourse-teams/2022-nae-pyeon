import React from "react";
import { useMutation } from "@tanstack/react-query";

import { postTeamInviteToken } from "@/api/team";

import { Team } from "@/types";

const useCreateInviteLink = () => {
  const {
    mutate: createInviteLink,
    isLoading,
    isSuccess,
    isError,
    data,
  } = useMutation(({ id }: Pick<Team, "id">) => {
    return postTeamInviteToken(id);
  });

  return { createInviteLink, isLoading, isSuccess, isError, data };
};

export default useCreateInviteLink;
