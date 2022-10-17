import { useMutation } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

import { postTeamRollingpaper } from "@/api/rollingpaper";

import { useSnackbar } from "@/context/SnackbarContext";

import { PostTeamRollingpaperResponse } from "@/types/apiResponse";
import { Rollingpaper, Team } from "@/types";

interface CreateTeamrRollingpaperVariables {
  teamId: Team["id"];
  title: Rollingpaper["title"];
}

const useCreateTeamRollingpaper = () => {
  const { openSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const { mutate: createTeamRollingpaper } = useMutation<
    PostTeamRollingpaperResponse,
    AxiosError,
    CreateTeamrRollingpaperVariables
  >(({ teamId, title }) => postTeamRollingpaper({ teamId, title }), {
    onSuccess: (data, variable) => {
      navigate(`/team/${variable.teamId}/rollingpaper/${data.id}`);
      openSnackbar("롤링페이퍼 생성 완료");
    },
    useErrorBoundary: true,
  });

  return createTeamRollingpaper;
};

export default useCreateTeamRollingpaper;
