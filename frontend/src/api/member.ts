import { appClient } from "@/api";

const getMyUserInfo = () => {
  return appClient.get("/members/me").then((response) => response.data);
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

export { getMyUserInfo, getMyReceivedRollingpapers, getMySentMessage };
