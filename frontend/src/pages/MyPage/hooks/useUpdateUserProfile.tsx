import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { useSnackbar } from "@/context/SnackbarContext";

import { queryClient } from "@/api";
import { putMyNickname } from "@/api/member";
import { TeamMember } from "@/types";

interface UpdateUserProfileVariable {
  username: TeamMember["nickname"];
}

const useUpdateUserProfile = () => {
  const { openSnackbar } = useSnackbar();

  const { mutate: updateUserProfile } = useMutation<
    null,
    AxiosError,
    UpdateUserProfileVariable
  >(
    async ({ username }) => {
      return putMyNickname(username);
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries(["user-profile"]);
        openSnackbar("이름 수정 완료");
      },
    }
  );

  return updateUserProfile;
};

export default useUpdateUserProfile;
