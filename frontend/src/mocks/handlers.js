import { rest } from "msw";
import rollingPaperDummy from "./dummy/rollingpapers.json";
import myTeamsDummy from "./dummy/myTeams.json";

const rollingpapers = rollingPaperDummy.rollingpapers;
const myTeams = myTeamsDummy.teams;

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
];
