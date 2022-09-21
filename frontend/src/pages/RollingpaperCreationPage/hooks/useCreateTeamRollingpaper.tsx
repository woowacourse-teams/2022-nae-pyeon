import { useMutation } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

import { postTeamRollingpaper } from "@/api/rollingpaper";

import { useSnackbar } from "@/context/SnackbarContext";

import { PostTeamRollingpaperResponse } from "@/types/apiResponse";
import { Rollingpaper } from "@/types";

const useCreateTeamRollingpaper = (teamId: number) => {
  const { openSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const { mutate: createTeamRollingpaper } = useMutation<
    PostTeamRollingpaperResponse,
    AxiosError,
    Rollingpaper["title"]
  >(
    (title) => {
      return postTeamRollingpaper({ teamId, title });
    },
    {
      onSuccess: () => {
        navigate(`/team/${teamId}`);
        openSnackbar("롤링페이퍼 생성 완료");
      },
      useErrorBoundary: true,
    }
  );

  return createTeamRollingpaper;
};

export default useCreateTeamRollingpaper;
