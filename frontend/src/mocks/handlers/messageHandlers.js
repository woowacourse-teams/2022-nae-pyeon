import { rest } from "msw";

import rollingPaperDummy from "../dummy/rollingpapers.json";

const rollingpapers = rollingPaperDummy.rollingpapers;

const messageHandlers = [
  // 메시지 생성
  rest.post(
    "/api/v1/rollingpapers/:rollingpaperId/messages",
    (req, res, ctx) => {
      const { rollingpaperId } = req.params;
      const accessToken = req.headers.headers.authorization;

      const { content } = req.body;

      const result = {
        id: 1,
      };

      return res(ctx.status(201), ctx.json(result));
    }
  ),

  // 단건 메시지 조회
  rest.get(
    "/api/v1/rollingpapers/:rollingpaperId/messages/:messageId",
    (req, res, ctx) => {
      const { rollingpaperId, messageId } = req.params;

      const message = rollingpapers
        .find((rollingpaper) => rollingpaper.id === +rollingpaperId)
        .messages.find((message) => message.id === +messageId);

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
];

export default messageHandlers;
