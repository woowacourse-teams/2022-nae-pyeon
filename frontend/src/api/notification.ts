import { requestApi, appClient } from "@/api";
import { PutNotificationRequest } from "@/types/apiRequest";

const getNotifications = async () =>
  requestApi(() => appClient.get("/notifications"));

const putNotification = async ({ id }: PutNotificationRequest) =>
  requestApi(() => appClient.put(`/notifications/${id}`));

const putNotificationsAll = async () =>
  requestApi(() => appClient.put(`/notifications/all`));

export { getNotifications, putNotification, putNotificationsAll };
