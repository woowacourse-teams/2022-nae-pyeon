import { appClient, requestApi } from "@/api";

import { ApiOptions } from "@/types";

const getMyInfo = async (options?: ApiOptions) =>
  requestApi(() => appClient.get("/members/me"), options);

const getMyInfoWithAccessToken = async (
  accessToken: string | null,
  options?: ApiOptions
) =>
  requestApi(
    () =>
      appClient.get("/members/me", {
        headers: {
          Authorization: `Bearer ${accessToken || ""}`,
        },
      }),
    options
  );

const getMyReceivedRollingpapers = async (
  page = 0,
  count = 5,
  options?: ApiOptions
) =>
  requestApi(
    () =>
      appClient.get(
        `/members/me/rollingpapers/received?page=${page}&count=${count}`
      ),
    options
  );

const getMySentMessage = async (page = 0, count = 5, options?: ApiOptions) =>
  requestApi(
    () =>
      appClient.get(`/members/me/messages/written?page=${page}&count=${count}`),
    options
  );

const putMyNickname = async (username: string, options?: ApiOptions) =>
  requestApi(() => appClient.put("/members/me", { username }), options);

export {
  getMyInfo,
  getMyInfoWithAccessToken,
  getMyReceivedRollingpapers,
  getMySentMessage,
  putMyNickname,
};
