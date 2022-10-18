import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { useSnackbar } from "@/context/SnackbarContext";

import { postMemberRollingpaper } from "@/api/rollingpaper";

import { PostMemberRollingpaperResponse } from "@/types/apiResponse";
import { PostMemberRollingpaperRequest } from "@/types/apiRequest";

const useCreateMemberRollingpaper = () => {
  const { openSnackbar } = useSnackbar();
  const navigate = useNavigate();

  return useMutation<
    PostMemberRollingpaperResponse,
    AxiosError,
    PostMemberRollingpaperRequest
  >(
    ({ teamId, title, addresseeId }) =>
      postMemberRollingpaper({ teamId, title, addresseeId }),
    {
      onSuccess: (data, variable) => {
        navigate(`/team/${variable.teamId}`);
        openSnackbar("롤링페이퍼 생성 완료");
      },
    }
  );
};

export default useCreateMemberRollingpaper;
