import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { useSnackbar } from "@/context/SnackbarContext";

import { queryClient } from "@/api";
import { putMyUsername } from "@/api/member";

import { PutMyUsernameRequest } from "@/types/apiRequest";

const useUpdateUserProfile = () => {
  const { openSnackbar } = useSnackbar();

  return useMutation<null, AxiosError, PutMyUsernameRequest>(
    async ({ username }) => {
      return putMyUsername({ username });
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries(["user-profile"]);
        openSnackbar("이름 수정 완료");
      },
    }
  );
};

export default useUpdateUserProfile;
