import { useMutation } from "@tanstack/react-query";

import { useSnackbar } from "@/context/SnackbarContext";

import useValidatedParam from "@/hooks/useValidatedParam";

import { queryClient } from "@/api";
import { postTeamMember } from "@/api/team";
import { AxiosError } from "axios";
import { TeamMember } from "@/types";

type CreateTeamMemberVariables = TeamMember["nickname"];

const useCreateTeamMember = (onClickCloseButton: () => void) => {
  const { openSnackbar } = useSnackbar();
  const teamId = useValidatedParam<number>("teamId");

  const { mutate: createTeamMember } = useMutation<
    null,
    AxiosError,
    CreateTeamMemberVariables
  >((nickname) => postTeamMember({ id: teamId, nickname }), {
    onSuccess: () => {
      queryClient.refetchQueries(["team", teamId]);
      queryClient.refetchQueries(["rollingpaperList", teamId]);
      onClickCloseButton();
      openSnackbar("모임 가입 완료");
    },
  });

  return createTeamMember;
};

export default useCreateTeamMember;
