import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

import { useSnackbar } from "@/context/SnackbarContext";

import { postTeamMemberWithInviteCode } from "@/api/team";

import { PostTeamWithInviteCodeResponse } from "@/types/apiResponse";
import { TeamMember } from "@/types";

interface CreateTeamWithInviteCodeVariable {
  inviteCode: string;
  nickname: TeamMember["nickname"];
}

const useCreateTeamWithInviteCode = (teamId?: number) => {
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbar();

  const { mutate: createTeamWithInviteCode } = useMutation<
    PostTeamWithInviteCodeResponse,
    AxiosError,
    CreateTeamWithInviteCodeVariable
  >(
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

  return createTeamWithInviteCode;
};

export default useCreateTeamWithInviteCode;
