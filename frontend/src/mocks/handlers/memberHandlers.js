import { rest } from "msw";

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
];

export default memberHandlers;
