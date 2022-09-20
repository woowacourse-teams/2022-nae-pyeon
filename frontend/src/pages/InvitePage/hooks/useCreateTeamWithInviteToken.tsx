import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

import { useSnackbar } from "@/context/SnackbarContext";

import { postTeamMemberWithInviteToken } from "@/api/team";

import { PostTeamMemberWithInviteTokenRequest } from "@/types/apiRequest";
import { PostTeamWithInviteTokenResponse } from "@/types/apiResponse";

const useCreateTeamWithInviteToken = (teamId?: number) => {
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbar();

  const { mutate: createTeamWithInviteToken } = useMutation<
    PostTeamWithInviteTokenResponse,
    AxiosError,
    PostTeamMemberWithInviteTokenRequest
  >(
    ({ inviteToken, nickname }) =>
      postTeamMemberWithInviteToken({
        inviteToken,
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
      useErrorBoundary: true,
    }
  );

  return createTeamWithInviteToken;
};

export default useCreateTeamWithInviteToken;
