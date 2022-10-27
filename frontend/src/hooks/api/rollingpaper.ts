import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { useSnackbar } from "@/context/SnackbarContext";

import {
  getRollingpaper,
  postMemberRollingpaper,
  postTeamRollingpaper,
} from "@/api/rollingpaper";

import {
  GetRollingpaperResponse,
  PostMemberRollingpaperResponse,
  PostTeamRollingpaperResponse,
} from "@/types/apiResponse";

import {
  PostMemberRollingpaperRequest,
  PostTeamRollingpaperRequest,
} from "@/types/apiRequest";

interface UseReadRollingpaperParams {
  teamId: number;
  rollingpaperId: number;
}

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
      onSuccess: (data, variables) => {
        navigate(`/team/${variables.teamId}/rollingpaper/${data.id}`);
        openSnackbar("롤링페이퍼 생성 완료");
      },
    }
  );
};

const useCreateTeamRollingpaper = () => {
  const { openSnackbar } = useSnackbar();
  const navigate = useNavigate();

  return useMutation<
    PostTeamRollingpaperResponse,
    AxiosError,
    PostTeamRollingpaperRequest
  >(({ teamId, title }) => postTeamRollingpaper({ teamId, title }), {
    onSuccess: (data, variables) => {
      navigate(`/team/${variables.teamId}/rollingpaper/${data.id}`);
      openSnackbar("롤링페이퍼 생성 완료");
    },
  });
};

const useReadRollingpaper = ({
  teamId,
  rollingpaperId,
}: UseReadRollingpaperParams) =>
  useQuery<GetRollingpaperResponse, AxiosError>(
    ["rollingpaper", rollingpaperId],
    () => getRollingpaper({ teamId, id: rollingpaperId })
  );

export {
  useCreateMemberRollingpaper,
  useCreateTeamRollingpaper,
  useReadRollingpaper,
};
