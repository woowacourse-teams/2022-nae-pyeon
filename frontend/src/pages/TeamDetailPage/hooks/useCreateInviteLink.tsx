import React from "react";
import { useMutation } from "@tanstack/react-query";

import axios from "axios";

import { postTeamInviteToken } from "@/api/team";

import { CustomError, Team } from "@/types";

const useCreateInviteLink = () => {
  const {
    mutate: createInviteLink,
    isLoading,
    isSuccess,
    isError,
    data,
  } = useMutation(
    ({ id }: Pick<Team, "id">) => {
      return postTeamInviteToken({ id });
    },
    {
      onError: (error) => {
        if (axios.isAxiosError(error) && error.response) {
          const customError = error.response.data as CustomError;
          alert(customError.message);
        }
      },
    }
  );

  return { createInviteLink, isLoading, isSuccess, isError, data };
};

export default useCreateInviteLink;
