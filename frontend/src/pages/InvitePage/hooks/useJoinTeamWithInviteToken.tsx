import React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { postTeamMemberWithInviteToken } from "@/api/team";

import { CustomError, Team } from "@/types";
import { useSnackbar } from "@/context/SnackbarContext";

type RequestJoinTeamWithInviteToken = Pick<Team, "nickname"> & {
  inviteToken: string;
};

const useJoinTeamWithInviteToken = (teamId: number | undefined) => {
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbar();

  const { mutate: joinTeamWithInviteToken } = useMutation(
    ({ inviteToken, nickname }: RequestJoinTeamWithInviteToken) => {
      return postTeamMemberWithInviteToken({
        inviteToken,
        nickname,
      });
    },
    {
      onSuccess: () => {
        openSnackbar("모임 가입 성공!");

        if (teamId) {
          navigate(`/team/${teamId}`, { replace: true });
          return;
        }

        navigate("/", { replace: true });
      },
      onError: (error) => {
        if (axios.isAxiosError(error) && error.response) {
          const customError = error.response.data as CustomError;
          alert(customError.message);
        }
      },
    }
  );

  return joinTeamWithInviteToken;
};

export default useJoinTeamWithInviteToken;
