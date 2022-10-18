import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

import { useSnackbar } from "@/context/SnackbarContext";

import { postTeamMemberWithInviteCode } from "@/api/team";

import { PostTeamMemberWithInviteCodeRequest } from "@/types/apiRequest";

const useCreateTeamMemberWithInviteCode = (teamId?: number) => {
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbar();

  return useMutation<null, AxiosError, PostTeamMemberWithInviteCodeRequest>(
    ({ inviteCode, nickname }) =>
      postTeamMemberWithInviteCode({
        inviteCode,
        nickname,
      }),
    {
      onSuccess: () => {
        openSnackbar("모임 가입 성공!");

        if (teamId) {
          navigate(`/team/${teamId}`, { replace: true });
          return;
        }

        navigate("/", { replace: true });
      },
    }
  );
};

export default useCreateTeamMemberWithInviteCode;
