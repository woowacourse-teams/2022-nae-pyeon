import { useQuery, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { useSnackbar } from "@/context/SnackbarContext";

import { setAppClientHeaderAuthorization, queryClient } from "@/api";

import {
  getMyReceivedRollingpapers,
  getMySentMessages,
  getMyInfo,
  putMyUsername,
  postRenewalToken,
} from "@/api/member";

import {
  COOKIE_KEY,
  TOKEN_MAX_AGE,
  MYPAGE_ROLLINGPAPER_PAGING_COUNT,
  MYPAGE_MESSAGE_PAGING_COUNT,
} from "@/constants";

import { PutMyUsernameRequest } from "@/types/apiRequest";

import {
  GetMyReceivedRollingpapersResponse,
  GetMySentMessagesResponse,
  GetUserProfileResponse,
  PostRenewalTokenResponse,
} from "@/types/apiResponse";

import { setCookie } from "@/util/cookie";

interface postRenewalTokenVariables {
  refreshToken: string;
  mutateFunc?: () => void;
}

const useReadReceivedRollingpapers = (currentPage = 0) => {
  return useQuery<GetMyReceivedRollingpapersResponse, AxiosError>(
    ["received-rollingpapers", currentPage],
    () =>
      getMyReceivedRollingpapers({
        page: currentPage,
        count: MYPAGE_ROLLINGPAPER_PAGING_COUNT,
      }),
    {
      keepPreviousData: true,
    }
  );
};

const useReadSentMessages = (currentPage = 0) =>
  useQuery<GetMySentMessagesResponse, AxiosError>(
    ["sent-messages", currentPage],
    () =>
      getMySentMessages({
        page: currentPage,
        count: MYPAGE_MESSAGE_PAGING_COUNT,
      }),
    { keepPreviousData: true }
  );

const useReadUserProfile = () => {
  return useQuery<GetUserProfileResponse, AxiosError>(["user-profile"], () =>
    getMyInfo()
  );
};

const useUpdateUserProfile = () => {
  const { openSnackbar } = useSnackbar();

  return useMutation<null, AxiosError, PutMyUsernameRequest>(
    async ({ username }) => {
      return putMyUsername({ username });
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries(["user-profile"]);
        openSnackbar("이름 수정 완료");
      },
    }
  );
};

const useCreateRenewalToken = () => {
  return useMutation<
    PostRenewalTokenResponse,
    AxiosError,
    postRenewalTokenVariables
  >(({ refreshToken, mutateFunc }) => postRenewalToken({ refreshToken }), {
    onSuccess: (data, variables) => {
      if (data) {
        const { accessToken } = data;
        setCookie({
          name: COOKIE_KEY.ACCESS_TOKEN,
          value: accessToken,
          maxAge: TOKEN_MAX_AGE.ACCESS_TOKEN,
        });
        setAppClientHeaderAuthorization(accessToken);

        if (variables.mutateFunc) {
          // post, put, delete
          variables.mutateFunc();
        } else {
          // get
          window.location.reload();
        }
      }
    },
  });
};

export {
  useReadReceivedRollingpapers,
  useReadSentMessages,
  useReadUserProfile,
  useUpdateUserProfile,
  useCreateRenewalToken,
};
