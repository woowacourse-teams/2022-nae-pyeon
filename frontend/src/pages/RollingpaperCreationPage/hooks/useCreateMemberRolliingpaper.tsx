import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

import { postMemberRollingpaper } from "@/api/rollingpaper";

import { useSnackbar } from "@/context/SnackbarContext";

import { PostMemberRollingpaperResponse } from "@/types/apiResponse";
import { Rollingpaper, Team, TeamMember } from "@/types";

interface CreateMemberRollingpaperVariable {
  teamId: Team["id"];
  title: Rollingpaper["title"];
  addresseeId: TeamMember["id"];
}

const useCreateMemberRollingpaper = () => {
  const { openSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const { mutate: createMemberRollingpaper } = useMutation<
    PostMemberRollingpaperResponse,
    AxiosError,
    CreateMemberRollingpaperVariable
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

  return createMemberRollingpaper;
};

export default useCreateMemberRollingpaper;
