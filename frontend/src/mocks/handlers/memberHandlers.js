import { rest } from "msw";
import receivedRollinpapersDummy from "../dummy/receivedRollingpapers.json";
import sentMessagesDummy from "../dummy/sentMessages.json";

const memberHandlers = [
  // 로그인
  rest.post("/api/v1/login", (req, res, ctx) => {
    const { platformType, platformId, email, username, profileImageUrl } =
      req.body;

    const result = { accessToken: "accessToken2", id: 1 };

    return res(ctx.status(200), ctx.json(result));
  }),

  // 카카오 OAuth
  rest.post("/api/v1/oauth/kakao", (req, res, ctx) => {
    const { authorizationCode, redirectUri } = req.body;

    const result = { accessToken: "accessToken2", id: 1 };

    return res(ctx.status(200), ctx.json(result));
  }),

  // google OAuth
  rest.post("/api/v1/oauth/google", (req, res, ctx) => {
    const { authorizationCode, redirectUri } = req.body;

    const result = { accessToken: "accessToken2", id: 1 };

    return res(ctx.status(200), ctx.json(result));
  }),

  // 내 정보 조회
  rest.get("/api/v1/members/me", (req, res, ctx) => {
    const accessToken = req.headers.headers.authorization.split(" ")[1];

    if (!accessToken) {
      return res(ctx.status(401));
    }

    const result = {
      id: 123,
      username: "우아한",
      email: "woowa@woowa.com",
    };

    return res(ctx.json(result));
  }),

  // 내 정보 수정
  rest.put("/api/v1/members/me", (req, res, ctx) => {
    const accessToken = req.headers.headers.authorization.split(" ")[1];

    if (!accessToken) {
      return res(ctx.status(401));
    }

    return res(ctx.status(204));
  }),

  // 내가 받은 롤링페이퍼 목록 조회
  rest.get("/api/v1/members/me/rollingpapers/received", (req, res, ctx) => {
    const page = req.url.searchParams.get("page");
    const count = req.url.searchParams.get("count");

    const begin = page % 2 === 1 ? 0 : 5;
    const end = page % 2 === 1 ? 5 : 10;

    const result = {
      totalCount: 160,
      currentPage: Number(page),
      rollingpapers: receivedRollinpapersDummy.rollingpapers.slice(0, 5),
    };

    return res(ctx.json(result));
  }),

  // 내가 쓴 메시지 목록 조회
  rest.get("/api/v1/members/me/messages/written", (req, res, ctx) => {
    const page = req.url.searchParams.get("page");
    const count = req.url.searchParams.get("count");

    const begin = page % 2 === 1 ? 0 : 5;
    const end = page % 2 === 1 ? 5 : 10;

    const result = {
      totalCount: 160,
      currentPage: Number(page),
      messages: sentMessagesDummy.messages.slice(0, 5),
    };

    return res(ctx.json(result));
  }),

  // 리프래시 토큰으로 새로운 액세스 토큰 생성
  rest.post("/renewal-token", (req, res, ctx) => {
    const result = {
      accessToken: "newAccessToken",
    };

    return res(ctx.json(result));
  }),

  // 리프래시 토큰 제거
  rest.post("/logout", (req, res, ctx) => {
    return res(ctx.status(204));
  }),
];

export default memberHandlers;
