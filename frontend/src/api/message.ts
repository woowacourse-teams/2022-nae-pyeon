import { appClient, requestApi } from "@/api";

import {
  PostMessageRequest,
  PutMessageRequest,
  DeleteMessageRequest,
  GetMessageRequest,
} from "@/types/apiRequest";

const getMessage = async ({ rollingpaperId, messageId }: GetMessageRequest) =>
  requestApi(() =>
    appClient.get(`/rollingpapers/${rollingpaperId}/messages/${messageId}`)
  );

const postMessage = async ({
  rollingpaperId,
  content,
  color,
  anonymous,
  secret,
}: PostMessageRequest) =>
  requestApi(() =>
    appClient.post(`/rollingpapers/${rollingpaperId}/messages`, {
      content,
      color,
      anonymous,
      secret,
    })
  );

const putMessage = async ({
  rollingpaperId,
  id,
  content,
  color,
  anonymous,
  secret,
}: PutMessageRequest) =>
  requestApi(() =>
    appClient.put(`/rollingpapers/${rollingpaperId}/messages/${id}`, {
      content,
      color,
      anonymous,
      secret,
    })
  );

const deleteMessage = async ({ rollingpaperId, id }: DeleteMessageRequest) =>
  requestApi(() =>
    appClient.delete(`/rollingpapers/${rollingpaperId}/messages/${id}`)
  );

export { getMessage, putMessage, postMessage, deleteMessage };
