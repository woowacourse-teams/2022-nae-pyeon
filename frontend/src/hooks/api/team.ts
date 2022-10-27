import { useNavigate } from "react-router-dom";
import { useInfiniteQuery, useQuery, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { useSnackbar } from "@/context/SnackbarContext";
import useCheckTeamJoined from "@/pages/InvitePage/hooks/useCheckTeamJoined";

import { queryClient } from "@/api";

import {
  getMyTeams,
  getTeam,
  getTeamWithInviteCode,
  getTeamMyNickname,
  getTeamRollingpapers,
  getTeamMembers,
  postTeam,
  postTeamMember,
  postTeamInviteCode,
  postTeamMemberWithInviteCode,
  putTeamNickname,
} from "@/api/team";

import {
  GetTeamRollingpapersRequest,
  PostTeamRequest,
  PostTeamMemberRequest,
  PostTeamInviteCodeRequest,
  PostTeamMemberWithInviteCodeRequest,
  PutTeamNicknameRequest,
} from "@/types/apiRequest";

import {
  GetMyTeamsResponse,
  GetTeamResponse,
  GetTeamMembersResponse,
  GetTeamMyNicknameResponse,
  GetTeamRollingpapersResponse,
  PostTeamInviteCodeResponse,
  PostTeamResponse,
} from "@/types/apiResponse";

import { MY_TEAM_COUNT } from "@/constants";

interface UseReadTeamMembersParams {
  teamId: number;
  onSuccess: (data: GetTeamMembersResponse) => void;
}

interface UseUpdateTeamNicknameParams {
  onSuccess: () => void;
}

const useCreateTeam = () => {
  const navigate = useNavigate();

  return useMutation<PostTeamResponse, AxiosError, PostTeamRequest>(
    ({ name, description, emoji, color, nickname, secret }) => {
      return postTeam({
        name,
        description,
        emoji,
        color,
        nickname,
        secret,
      });
    },
    {
      onSuccess: () => {
        navigate("/");
      },
    }
  );
};

const useCreateTeamMember = (onClickCloseButton: () => void) => {
  const { openSnackbar } = useSnackbar();

  return useMutation<null, AxiosError, PostTeamMemberRequest>(
    ({ id, nickname }) => postTeamMember({ id, nickname }),
    {
      onSuccess: (data, variables) => {
        queryClient.refetchQueries(["team", variables.id]);
        queryClient.refetchQueries(["rollingpaperList", variables.id]);
        onClickCloseButton();
        openSnackbar("모임 가입 완료");
      },
    }
  );
};

const useCreateTeamMemberWithInviteCode = (teamId?: number) => {
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbar();

  return useMutation<null, AxiosError, PostTeamMemberWithInviteCodeRequest>(
    ({ inviteCode, nickname }) =>
      postTeamMemberWithInviteCode({
        inviteCode,
        nickname,
      }),
    {
      onSuccess: () => {
        openSnackbar("모임 가입 성공!");

        if (teamId) {
          navigate(`/team/${teamId}`, { replace: true });
          return;
        }

        navigate("/", { replace: true });
      },
    }
  );
};

const useCreateInviteLink = () => {
  return useMutation<
    PostTeamInviteCodeResponse,
    AxiosError,
    PostTeamInviteCodeRequest
  >(({ id }) => postTeamInviteCode({ id }), {});
};

const useReadMyTeamsPaging = () =>
  useInfiniteQuery<GetMyTeamsResponse>(
    ["my-teams"],
    getMyTeams(MY_TEAM_COUNT),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.currentPage * MY_TEAM_COUNT < lastPage.totalCount) {
          return lastPage.currentPage + 1;
        }
      },
    }
  );

const useReadTeamDetail = (teamId: number) =>
  useQuery<GetTeamResponse, AxiosError>(["team", teamId], () =>
    getTeam(teamId)
  );

const useReadTeamDetailWithInviteCode = (inviteCode: string) => {
  const handleTeamDetailWithInviteCodeSuccess = useCheckTeamJoined();
  return useQuery<GetTeamResponse, AxiosError>(
    ["teamDetailWithInviteCode", inviteCode],
    () => getTeamWithInviteCode(inviteCode),
    {
      onSuccess: handleTeamDetailWithInviteCodeSuccess,
      useErrorBoundary: true,
    }
  );
};

const useReadTeamNickname = (teamId: number) =>
  useQuery<GetTeamMyNicknameResponse, AxiosError>(
    ["team-nickname", teamId],
    () => getTeamMyNickname(teamId)
  );

const useReadTeamRollingpaper = ({
  id,
  order,
  filter,
}: GetTeamRollingpapersRequest) =>
  useQuery<GetTeamRollingpapersResponse, AxiosError>(
    ["rollingpaperList", id, order, filter],
    () => getTeamRollingpapers({ id, order, filter })
  );

const useReadTeamMembers = ({
  teamId,
  onSuccess,
}: UseReadTeamMembersParams) => {
  return useQuery<GetTeamMembersResponse, AxiosError>(
    ["team-member", teamId],
    () => getTeamMembers(teamId),
    {
      onSuccess,
      enabled: !!teamId,
    }
  );
};

const useUpdateTeamNickname = ({ onSuccess }: UseUpdateTeamNicknameParams) => {
  const { openSnackbar } = useSnackbar();

  return useMutation<null, AxiosError, PutTeamNicknameRequest>(
    ({ id, nickname }) => putTeamNickname({ id, nickname }),
    {
      onSuccess: (data, variables) => {
        queryClient.refetchQueries(["team", variables.id]);
        queryClient.refetchQueries(["rollingpaperList", variables.id]);
        onSuccess();
        openSnackbar("닉네임 수정 완료");
      },
    }
  );
};

export {
  useCreateTeam,
  useCreateTeamMember,
  useCreateInviteLink,
  useCreateTeamMemberWithInviteCode,
  useReadMyTeamsPaging,
  useReadTeamDetail,
  useReadTeamDetailWithInviteCode,
  useReadTeamNickname,
  useReadTeamRollingpaper,
  useReadTeamMembers,
  useUpdateTeamNickname,
};
