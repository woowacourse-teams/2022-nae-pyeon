import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

import { postMemberRollingpaper } from "@/api/rollingpaper";

import { useSnackbar } from "@/context/SnackbarContext";

import { PostMemberRollingpaperResponse } from "@/types/apiResponse";
import { Rollingpaper, TeamMember } from "@/types";

interface CreateMemberRollingpaperVariable {
  title: Rollingpaper["title"];
  addresseeId: TeamMember["id"];
}

const useCreateMemberRollingpaper = (teamId: number) => {
  const { openSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const { mutate: createMemberRollingpaper } = useMutation<
    PostMemberRollingpaperResponse,
    AxiosError,
    CreateMemberRollingpaperVariable
  >(
    ({ title, addresseeId }) =>
      postMemberRollingpaper({ teamId, title, addresseeId }),
    {
      useErrorBoundary: true,
      onSuccess: () => {
        navigate(`/team/${teamId}`);
        openSnackbar("롤링페이퍼 생성 완료");
      },
    }
  );

  return createMemberRollingpaper;
};

export default useCreateMemberRollingpaper;
