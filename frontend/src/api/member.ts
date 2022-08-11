import { appClient } from "@/api";

const getMyInfo = () => {
  return appClient.get("/members/me").then((response) => response.data);
};

const getMyInfoWithAccessToken = (accessToken: string | null) => {
  return appClient
    .get("/members/me", {
      headers: {
        Authorization: `Bearer ${accessToken || ""}`,
      },
    })
    .then((response) => response.data);
};

const getMyReceivedRollingpapers = (page = 0, count = 5) => {
  return appClient
    .get(`/members/me/rollingpapers/received?page=${page}&count=${count}`)
    .then((response) => response.data);
};

const getMySentMessage = (page = 0, count = 5) => {
  return appClient
    .get(`/members/me/messages/written?page=${page}&count=${count}`)
    .then((response) => response.data);
};

const postMyNickname = (username: string) => {
  return appClient
    .put("/members/me", { username })
    .then((response) => response.data);
};

export {
  getMyInfo,
  getMyInfoWithAccessToken,
  getMyReceivedRollingpapers,
  getMySentMessage,
  postMyNickname,
};
