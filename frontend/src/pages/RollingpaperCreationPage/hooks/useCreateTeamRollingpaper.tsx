import { useMutation } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

import { postTeamRollingpaper } from "@/api/rollingpaper";

import { useSnackbar } from "@/context/SnackbarContext";

import { PostTeamRollingpaperResponse } from "@/types/apiResponse";
import { Rollingpaper, Team } from "@/types";

interface CreateTeamRollingpaperVaribale {
  teamId: Team["id"];
  title: Rollingpaper["title"];
}

const useCreateTeamRollingpaper = (teamId: number) => {
  const { openSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const { mutate: createTeamRollingpaper } = useMutation<
    PostTeamRollingpaperResponse,
    AxiosError,
    CreateTeamRollingpaperVaribale
  >(
    ({ title }) => {
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
