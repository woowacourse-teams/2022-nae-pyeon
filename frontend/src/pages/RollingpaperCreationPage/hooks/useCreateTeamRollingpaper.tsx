import { useMutation } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

import { postTeamRollingpaper } from "@/api/rollingpaper";

import { useSnackbar } from "@/context/SnackbarContext";

import { PostTeamRollingpaperResponse } from "@/types/apiResponse";
import { Rollingpaper } from "@/types";

type CreateTeamRollingpaperVariable = Rollingpaper["title"];

const useCreateTeamRollingpaper = (teamId: number) => {
  const { openSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const { mutate: createTeamRollingpaper } = useMutation<
    PostTeamRollingpaperResponse,
    AxiosError,
    CreateTeamRollingpaperVariable
  >(
    (title) => {
      return postTeamRollingpaper({ teamId, title });
    },
    {
      onSuccess: () => {
        navigate(`/team/${teamId}`);
        openSnackbar("롤링페이퍼 생성 완료");
      },
    }
  );

  return createTeamRollingpaper;
};

export default useCreateTeamRollingpaper;
