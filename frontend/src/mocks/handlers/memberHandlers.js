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

    const result = { accessToken: "accessToken2" };

    return res(ctx.status(200), ctx.json(result));
  }),
];

export default memberHandlers;
