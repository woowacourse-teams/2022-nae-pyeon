import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

import { postMemberRollingpaper } from "@/api/rollingpaper";

import { useSnackbar } from "@/context/SnackbarContext";

import { PostMemberRollingpaperResponse } from "@/types/apiResponse";
import { PostMemberRollingpaperRequest } from "@/types/apiRequest";

const useCreateMemberRollingpaper = (teamId: number) => {
  const { openSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const { mutate: createMemberRollingpaper } = useMutation<
    PostMemberRollingpaperResponse,
    AxiosError,
    PostMemberRollingpaperRequest
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
