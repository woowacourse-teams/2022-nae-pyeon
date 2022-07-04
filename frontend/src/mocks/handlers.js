import { rest } from "msw";
import dummy from "./dummy/rollingpapers.json";

const rollingpapersDummy = dummy.rollingpapers;

export const handlers = [
  // 롤링페이퍼 단건 조회
  rest.get(
    "/api/v1/teams/:teamId/rollingpapers/:rollingpaperId",
    (req, res, ctx) => {
      const { teamId, rollingpaperId } = req.params;

      const result = rollingpapersDummy.find(
        (rollingpaper) => rollingpaper.id === rollingpaperId
      );

      return res(ctx.json(result));
    }
  ),

  // 메시지 생성
  rest.post(
    "/api/v1/rollingpapers/:rollingpaperId/messages",
    (req, res, ctx) => {
      const { rollingpaperId } = req.params;
      const { content, authorId } = JSON.parse(req.body);

      const result = rollingpapersDummy.find(
        (rollingpaper) => rollingpaper.id === rollingpaperId
      );

      return res(ctx.status(201));
    }
  ),

  // 개인 롤링페이퍼 생성
  rest.post("/api/v1/teams/:teamId/rollingpapers", (req, res, ctx) => {
    const { teamId } = req.params;
    const { title, memberId } = JSON.parse(req.body);

    return res(ctx.status(201));
  }),
];
