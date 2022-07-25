import { rest } from "msw";

import rollingPaperDummy from "../dummy/rollingpapers.json";

const rollingpapers = rollingPaperDummy.rollingpapers;

const rollingpaperHandlers = [
  // 개인 롤링페이퍼 생성
  rest.post("/api/v1/teams/:teamId/rollingpapers", (req, res, ctx) => {
    const { teamId } = req.params;
    const { title, addresseeId } = req.body;

    const result = {
      id: 2,
    };

    return res(ctx.status(201), ctx.json(result));
  }),

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

  // 롤링페이퍼 목록 조회 by Team
  rest.get("/api/v1/teams/:teamId/rollingpapers", (req, res, ctx) => {
    const { teamId } = req.params;

    const result = {
      rollingpapers: rollingpapers.map(({ id, title, to }) => ({
        id,
        title,
        to,
      })),
    };

    return res(ctx.status(200), ctx.json(result));
  }),
];

export default rollingpaperHandlers;
