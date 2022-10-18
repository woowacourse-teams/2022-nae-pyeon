import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { useSnackbar } from "@/context/SnackbarContext";

import { queryClient } from "@/api";
import { postTeamMember } from "@/api/team";

import { PostTeamMemberRequest } from "@/types/apiRequest";

const useCreateTeamMember = (onClickCloseButton: () => void) => {
  const { openSnackbar } = useSnackbar();

  return useMutation<null, AxiosError, PostTeamMemberRequest>(
    ({ id, nickname }) => postTeamMember({ id, nickname }),
    {
      onSuccess: (data, variables) => {
        queryClient.refetchQueries(["team", variables.id]);
        queryClient.refetchQueries(["rollingpaperList", variables.id]);
        onClickCloseButton();
        openSnackbar("모임 가입 완료");
      },
    }
  );
};

export default useCreateTeamMember;
