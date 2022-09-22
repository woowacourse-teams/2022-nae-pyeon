import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { useSnackbar } from "@/context/SnackbarContext";
import useValidatedParam from "@/hooks/useValidatedParam";

import { queryClient } from "@/api";
import { putTeamNickname } from "@/api/team";

import { Team, TeamMember } from "@/types";

type UpdateTeamNicknameVariable = TeamMember["nickname"];

const useUpdateTeamNickname = (onClickCloseButton: () => void) => {
  const teamId = useValidatedParam<Team["id"]>("teamId");
  const { openSnackbar } = useSnackbar();

  const { mutate: updateTeamNickname } = useMutation<
    null,
    AxiosError,
    UpdateTeamNicknameVariable
  >((nickname: string) => putTeamNickname({ id: teamId, nickname }), {
    onSuccess: () => {
      queryClient.refetchQueries(["team", teamId]);
      queryClient.refetchQueries(["rollingpaperList", teamId]);
      onClickCloseButton();
      openSnackbar("닉네임 수정 완료");
    },
    useErrorBoundary: true,
  });

  return updateTeamNickname;
};

export default useUpdateTeamNickname;
