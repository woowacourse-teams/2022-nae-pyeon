import { rest } from "msw";

import notificationDummy from "../dummy/notifications.json";

const notificationHandlers = [
  // 알림 전체 조회
  rest.get("/api/v1/notifications", (req, res, ctx) => {
    const accessToken = req.headers.headers.authorization.split(" ")[1];

    if (!accessToken) {
      return res(ctx.status(400));
    }

    const result = {
      unreadCount: notificationDummy.notifications.length,
      notifications: notificationDummy.notifications,
    };

    return res(ctx.json(result));
  }),

  // 알림 단건 삭제
  rest.put("/api/v1/notifications/:id", (req, res, ctx) => {
    const accessToken = req.headers.headers.authorization.split(" ")[1];

    return res(ctx.status(204));
  }),

  // 알림 전체 삭제
  rest.put("/api/v1/notifications/all", (req, res, ctx) => {
    const accessToken = req.headers.headers.authorization.split(" ")[1];

    return res(ctx.status(204));
  }),
];

export default notificationHandlers;
