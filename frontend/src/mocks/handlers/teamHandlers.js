import { raw } from "@storybook/react";
import { rest } from "msw";

import myTeamsDummy from "../dummy/myTeams.json";
import totalTeamsDummy from "../dummy/totalTeams.json";

const myTeams = myTeamsDummy.teams;
const totalTeams = totalTeamsDummy.totalTeams;

const teamHandlers = [
  // 모임 생성
  rest.post("/api/v1/teams", (req, res, ctx) => {
    const { name, description, emoji, color } = req.body;
    const accessToken = req.headers.headers.authorization;

    const result = { id: 1 };

    return res(ctx.status(201), ctx.json(result));
  }),

  // 내가 가입한 모임 조회
  rest.get("/api/v1/teams/me", (req, res, ctx) => {
    const accessToken = req.headers.headers.authorization;

    const result = {
      teams: myTeams,
    };

    return res(ctx.json(result));
  }),

  // 전체 모임 조회
  rest.get("/api/v1/teams", (req, res, ctx) => {
    const accessToken = req.headers.headers.authorization;
    const keyword = req.url.searchParams.get("keyword");
    const page = +req.url.searchParams.get("page");
    const count = +req.url.searchParams.get("count");

    const result = {
      totalCount: totalTeams.length,
      currentPage: page,
      teams: totalTeams.slice((page - 1) * count, (page - 1) * count + count),
    };

    return res(ctx.json(result));
  }),

  // 모임 상세정보 조회
  rest.get("/api/v1/teams/:teamId", (req, res, ctx) => {
    const { teamId } = req.params;

    const result = myTeams.find((team) => team.id === +teamId);

    return res(ctx.status(200), ctx.json(result));
  }),

  // 모임 가입
  rest.post("/api/v1/teams/:teamId", (req, res, ctx) => {
    const { teamId } = req.params;
    const { nickname } = req.body;

    return res(ctx.status(204));
  }),

  // 모임에 속한 회원 리스트
  rest.get("/api/v1/teams/:teamId/members", (req, res, ctx) => {
    const result = {
      members: [
        {
          id: 1,
          nickname: "도리",
        },
        {
          id: 2,
          nickname: "소피아",
        },
        {
          id: 3,
          nickname: "승팡",
        },
        {
          id: 4,
          nickname: "제로",
        },
        {
          id: 5,
          nickname: "케이",
        },
        {
          id: 6,
          nickname: "알렉스",
        },
      ],
    };

    return res(ctx.json(result));
  }),
];

export default teamHandlers;
