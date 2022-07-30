import { rest } from "msw";
import receivedRollinpapersDummy from "../dummy/receivedRollingpapers.json";

const memberHandlers = [
  // 회원 가입 요쳥
  rest.post("/api/v1/members", (req, res, ctx) => {
    const { username, email, password } = req.body;

    return res(ctx.status(201));
  }),

  // 로그인
  rest.post("/api/v1/login", (req, res, ctx) => {
    const { email, password } = req.body;

    const result = { accessToken: "accessToken2", id: 1 };

    return res(ctx.status(200), ctx.json(result));
  }),

  // 내 정보 조회
  rest.get("/api/v1/members/me", (req, res, ctx) => {
    const accessToken = req.headers.headers.authorization.split(" ")[1];

    if (!accessToken) {
      return res(ctx.status(400));
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
      return res(ctx.status(400));
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
      totalCount: 160, // 전체 컨텐츠 개수
      currentPage: Number(page), // 현재 페이지 번호 - 확인차?
      rollingpapers: receivedRollinpapersDummy.rollingpapers.slice(begin, end),
    };

    return res(ctx.json(result));
  }),
];

export default memberHandlers;
