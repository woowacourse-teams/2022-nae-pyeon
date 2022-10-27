import { appClient, requestApi } from "@/api";

import {
  GetMyReceivedRollingpapersRequest,
  GetMySentMessagesRequest,
  postRenewalTokenRequest,
  postLogoutRequest,
  PutMyUsernameRequest,
} from "@/types/apiRequest";

const getMyInfo = async () => requestApi(() => appClient.get("/members/me"));

const getMyInfoWithAccessToken = async (accessToken: string) =>
  requestApi(() =>
    appClient.get("/members/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  );

const getMyReceivedRollingpapers = async ({
  page = 0,
  count = 5,
}: GetMyReceivedRollingpapersRequest) =>
  requestApi(() =>
    appClient.get(
      `/members/me/rollingpapers/received?page=${page}&count=${count}`
    )
  );

const getMySentMessages = async ({
  page = 0,
  count = 5,
}: GetMySentMessagesRequest) =>
  requestApi(() =>
    appClient.get(`/members/me/messages/written?page=${page}&count=${count}`)
  );

const postRenewalToken = async ({ refreshToken }: postRenewalTokenRequest) =>
  requestApi(() =>
    appClient.post("/renewal-token", {
      refreshToken,
    })
  );

const postLogout = async ({ refreshToken }: postLogoutRequest) =>
  requestApi(() =>
    appClient.post("/logout", {
      refreshToken,
    })
  );

const putMyUsername = async ({ username }: PutMyUsernameRequest) =>
  requestApi(() => appClient.put("/members/me", { username }));

export {
  getMyInfo,
  getMyInfoWithAccessToken,
  getMyReceivedRollingpapers,
  getMySentMessages,
  postRenewalToken,
  postLogout,
  putMyUsername,
};
