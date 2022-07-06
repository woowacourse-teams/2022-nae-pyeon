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
    const { title, memberId } = req.body;

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

      const result = {
        id: 1,
        content: "생일축하해",
        from: "도리",
        authorId: 1,
      };

      return res(ctx.status(200), ctx.json(result));
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
];
