import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

import { useSnackbar } from "@/context/SnackbarContext";

import { postTeamRollingpaper } from "@/api/rollingpaper";

import { PostTeamRollingpaperResponse } from "@/types/apiResponse";
import { PostTeamRollingpaperRequest } from "@/types/apiRequest";

const useCreateTeamRollingpaper = () => {
  const { openSnackbar } = useSnackbar();
  const navigate = useNavigate();

  return useMutation<
    PostTeamRollingpaperResponse,
    AxiosError,
    PostTeamRollingpaperRequest
  >(({ teamId, title }) => postTeamRollingpaper({ teamId, title }), {
    onSuccess: (data, variable) => {
      navigate(`/team/${variable.teamId}/rollingpaper/${data.id}`);
      openSnackbar("롤링페이퍼 생성 완료");
    },
  });
};

export default useCreateTeamRollingpaper;
