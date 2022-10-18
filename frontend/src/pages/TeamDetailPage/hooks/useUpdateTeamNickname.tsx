import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { useSnackbar } from "@/context/SnackbarContext";

import { queryClient } from "@/api";
import { putTeamNickname } from "@/api/team";

import { PutTeamNicknameRequest } from "@/types/apiRequest";

interface UseUpdateTeamNicknameParams {
  onSuccess: () => void;
}

const useUpdateTeamNickname = ({ onSuccess }: UseUpdateTeamNicknameParams) => {
  const { openSnackbar } = useSnackbar();

  const { mutate: updateTeamNickname } = useMutation<
    null,
    AxiosError,
    PutTeamNicknameRequest
  >(({ id, nickname }) => putTeamNickname({ id, nickname }), {
    onSuccess: (data, variables) => {
      queryClient.refetchQueries(["team", variables.id]);
      queryClient.refetchQueries(["rollingpaperList", variables.id]);
      onSuccess();
      openSnackbar("닉네임 수정 완료");
    },
  });

  return updateTeamNickname;
};

export default useUpdateTeamNickname;
