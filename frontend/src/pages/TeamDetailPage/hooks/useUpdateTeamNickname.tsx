import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { useSnackbar } from "@/context/SnackbarContext";
import useValidatedParam from "@/hooks/useValidatedParam";

import { queryClient } from "@/api";
import { putTeamNickname } from "@/api/team";

import { Team, TeamMember } from "@/types";

const useUpdateTeamNickname = (onClickCloseButton: () => void) => {
  const teamId = useValidatedParam<Team["id"]>("teamId");
  const { openSnackbar } = useSnackbar();

  const { mutate: updateTeamNickname } = useMutation<
    null,
    AxiosError,
    TeamMember["nickname"]
  >((nickname: string) => putTeamNickname({ id: teamId, nickname }), {
    onSuccess: () => {
      onClickCloseButton();
      openSnackbar("닉네임 수정 완료");
      queryClient.refetchQueries(["team", teamId]);
      queryClient.refetchQueries(["rollingpaperList", teamId]);
    },
    useErrorBoundary: true,
  });

  return updateTeamNickname;
};

export default useUpdateTeamNickname;
