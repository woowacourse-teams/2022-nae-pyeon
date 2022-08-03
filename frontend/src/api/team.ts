import { appClient } from "@/api";

const getMyTeams =
  (teamPageCount = 5) =>
  async ({ pageParam = 0 }) => {
    const data = appClient
      .get(`teams/me?page=${pageParam}&count=${teamPageCount}`)
      .then((response) => response.data);
    return data;
  };

export { getMyTeams };
