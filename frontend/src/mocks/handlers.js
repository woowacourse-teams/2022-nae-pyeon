import { rest } from "msw";
import rollingPaperDummy from "./dummy/rollingpapers.json";
import myTeamsDummy from "./dummy/myTeams.json";
import totalTeamsDummy from "./dummy/totalTeams.json";

const rollingpapers = rollingPaperDummy.rollingpapers;
const myTeams = myTeamsDummy.teams;
const totalTeams = totalTeamsDummy.totalTeams;

export const handlers = [
  // 롤링페이퍼 단건 조회
  rest.get(
    "/api/v1/teams/:teamId/rollingpapers/:rollingpaperId",
    (req, res, ctx) => {
      const { teamId, rollingpaperId } = req.params;

      const result = rollingpapers.find(
        (rollingpaper) => rollingpaper.id === +rollingpaperId
      );

      return res(ctx.json(result));
    }
  ),

  // 메시지 생성
  rest.post(
    "/api/v1/rollingpapers/:rollingpaperId/messages",
    (req, res, ctx) => {
      const { rollingpaperId } = req.params;
      const { accessToken } = req.headers.headers.authorization;
      const { content, authorId } = req.body;

      const result = {
        id: 1,
      };

      return res(ctx.status(201), ctx.json(result));
    }
  ),

  // 개인 롤링페이퍼 생성
  rest.post("/api/v1/teams/:teamId/rollingpapers", (req, res, ctx) => {
    const { teamId } = req.params;
    const { title, addresseeId } = req.body;

    const result = {
      id: 2,
    };

    return res(ctx.status(201), ctx.json(result));
  }),

  // 단건 메시지 조회
  rest.get(
    "/api/v1/rollingpapers/:rollingpaperId/messages/:messageId",
    (req, res, ctx) => {
      const { rollingpaperId, messageId } = req.params;

      const rollingpaper = rollingpapers.find(
        (rollingpaper) => rollingpaper.id === +rollingpaperId
      );
      const message = rollingpaper.messages.find(
        (message) => message.id === +messageId
      );

      return res(ctx.status(200), ctx.json(message));
    }
  ),

  // 메시지 수정
  rest.put(
    "/api/v1/rollingpapers/:rollingpaperId/messages/:messageId",
    (req, res, ctx) => {
      const { rollingpaperId, messageId } = req.params;
      const { content } = req.body;

      return res(ctx.status(204));
    }
  ),

  // 메시지 삭제
  rest.delete(
    "/api/v1/rollingpapers/:rollingpaperId/messages/:messageId",
    (req, res, ctx) => {
      const { rollingpaperId, messageId } = req.params;
      const { content } = req.body;

      return res(ctx.status(204));
    }
  ),

  // 모임 생성
  rest.post("/api/v1/teams", (req, res, ctx) => {
    const { name, description, emoji, color } = req.body;
    const { accessToken } = req.headers.headers.authorization;

    const result = { id: 1 };

    return res(ctx.status(201), ctx.json(result));
  }),

  // 회원 가입 요쳥
  rest.post("/api/v1/members", (req, res, ctx) => {
    const { username, email, password } = req.body;

    return res(ctx.status(201));
  }),

  // 로그인
  rest.post("/api/v1/login", (req, res, ctx) => {
    const { email, password } = req.body;

    const result = { accessToken: "accessToken" };

    return res(ctx.status(200), ctx.json(result));
  }),

  // 가입한 모임 조회
  rest.get("/api/v1/teams/me", (req, res, ctx) => {
    const { accessToken } = req.headers.headers.authorization;

    const result = myTeams;

    return res(ctx.json(result));
  }),

  // 전체 모임 조회
  rest.get("/api/v1/teams", (req, res, ctx) => {
    const { accessToken } = req.headers.headers.authorization;
    console.log(accessToken);

    const result = totalTeams;

    return res(ctx.json(result));

  // 롤링페이퍼 목록 조회
  rest.get("/api/v1/teams/:teamId/rollingpapers", (req, res, ctx) => {
    const { teamId } = req.params;

    const dummyRollingpapers = [
      {
        id: 1,
        title: "우테코 고마워",
        to: "우아한테크코스",
      },
      {
        id: 2,
        title: "소피아 생일 축하해 🎉",
        to: "소피아",
      },
      {
        id: 3,
        title: "오늘의 내 편 데일리 미팅",
        to: "내 편",
      },
      {
        id: 4,
        title: "이번 주 우리의 한 마디",
        to: "우아한테크코스",
      },
    ];

    return res(ctx.status(200), ctx.json(dummyRollingpapers));
  }),

  // 모임 상세정보 조회
  rest.get("/api/v1/teams/:teamId", (req, res, ctx) => {
    const { teamId } = req.params;

    const teamDetails = [
      {
        id: 1,
        name: "우아한테크코스 4기",
        description: "우아한테크코스 4기 FE, BE 모임입니다.",
        emoji: "😀",
        color: "#FFF598",
        joined: true,
      },
      {
        id: 2,
        name: "내 편💕",
        description: "우아한테크코스 4기 프로젝트 내 편",
        emoji: "😀",
        color: "#98DAFF",
        joined: false,
      },
    ];

    return res(ctx.status(200), ctx.json(teamDetails[teamId]));
  }),

  // 모임 가입
  rest.post("/api/v1/teams/:teamId", (req, res, ctx) => {
    const { teamId } = req.params;
    const { nickname } = req.body;

    return res(ctx.status(204));

  }),
];
