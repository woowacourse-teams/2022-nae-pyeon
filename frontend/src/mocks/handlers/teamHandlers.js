import { rest } from "msw";

import totalTeamsDummy from "../dummy/totalTeams.json";

const totalTeams = totalTeamsDummy.totalTeams;
const myTeams = totalTeams.filter((team) => team.joined);

const teamHandlers = [
  // 모임 생성
  rest.post("/api/v1/teams", (req, res, ctx) => {
    const { name, description, emoji, color, nickname, secret } = req.body;
    const accessToken = req.headers.headers.authorization;

    const result = { id: 1 };

    return res(ctx.status(201), ctx.json(result));
  }),

  // 내가 가입한 모임 조회
  rest.get("/api/v1/teams/me", (req, res, ctx) => {
    const accessToken = req.headers.headers.authorization;
    const page = +req.url.searchParams.get("page");
    const count = +req.url.searchParams.get("count");

    const result = {
      totalCount: myTeams.length,
      currentPage: Number(page),
      teams: myTeams.slice(page * count, page * count + count),
    };

    return res(ctx.json(result));
  }),

  // 전체 모임 조회
  rest.get("/api/v1/teams", (req, res, ctx) => {
    const accessToken = req.headers.headers.authorization;
    const keyword = req.url.searchParams.get("keyword");
    const page = +req.url.searchParams.get("page");
    const count = +req.url.searchParams.get("count");

    const keywordTeam = totalTeams
      .filter((team) => team.name.includes(keyword))
      .map(({ id, name, description, emoji, color, joined }) => ({
        id,
        name,
        description,
        emoji,
        color,
        joined,
      }));

    const result = {
      totalCount: keywordTeam.length,
      currentPage: Number(page),
      teams: keywordTeam.slice(page * count, page * count + count),
    };

    return res(ctx.json(result));
  }),

  // 초대토큰으로 모임 정보 조회
  rest.get("/api/v1/teams/invite", (req, res, ctx) => {
    const inviteToken = req.url.searchParams.get("inviteToken");

    const team = totalTeams.find((team) => team.secret);
    const result = {
      ...team,
    };

    return res(ctx.json(result));
  }),

  // 모임 상세정보 조회
  rest.get("/api/v1/teams/:teamId", (req, res, ctx) => {
    const { teamId } = req.params;

    const result = totalTeams.find((team) => team.id === +teamId);

    if (!result) {
      return res(ctx.status(404));
    }

    return res(ctx.status(200), ctx.json(result));
  }),

  // 모임 가입 (일반)
  rest.post("/api/v1/teams/:teamId", (req, res, ctx) => {
    const { teamId } = req.params;
    const { nickname } = req.body;

    return res(ctx.status(204));
  }),

  // 모임 닉네임 수정
  rest.put("/api/v1/teams/:teamId/me", (req, res, ctx) => {
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

  // 모임 초대토큰 생성하기
  rest.post("/api/v1/teams/:teamId/invite", (req, res, ctx) => {
    const { teamId } = req.params;

    const result = {
      inviteToken: "testInviteToken",
    };

    return res(ctx.json(result));
  }),

  // 모임 가입 (초대토큰)
  rest.post("/api/v1/teams/invite/join", (req, res, ctx) => {
    const { inviteToken, nickname } = req.body;

    return res(ctx.status(204));
  }),
];

export default teamHandlers;
