import { appClient, requestApi } from "@/api";

import { ApiOptions, User } from "@/types";
import {
  GetMyReceivedRollingpapersRequest,
  GetMySentMessagesRequest,
} from "@/types/apiRequest";

const getMyInfo = async (options?: ApiOptions) =>
  requestApi(() => appClient.get("/members/me"), options);

const getMyInfoWithAccessToken = async (
  accessToken: string,
  options?: ApiOptions
) =>
  requestApi(
    () =>
      appClient.get("/members/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    options
  );

const getMyReceivedRollingpapers = async (
  { page = 0, count = 5 }: GetMyReceivedRollingpapersRequest,
  options?: ApiOptions
) =>
  requestApi(
    () =>
      appClient.get(
        `/members/me/rollingpapers/received?page=${page}&count=${count}`
      ),
    options
  );

const getMySentMessages = async (
  { page = 0, count = 5 }: GetMySentMessagesRequest,
  options?: ApiOptions
) =>
  requestApi(
    () =>
      appClient.get(`/members/me/messages/written?page=${page}&count=${count}`),
    options
  );

const putMyNickname = async (
  username: User["username"],
  options?: ApiOptions
) => requestApi(() => appClient.put("/members/me", { username }), options);

export {
  getMyInfo,
  getMyInfoWithAccessToken,
  getMyReceivedRollingpapers,
  getMySentMessages,
  putMyNickname,
};
