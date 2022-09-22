import { appClient, requestApi } from "@/api";

import { ApiOptions } from "@/types/api";

import {
  PostMessageRequest,
  PutMessageRequest,
  DeleteMessageRequest,
} from "@/types/apiRequest";

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

export { putMessage, postMessage, deleteMessage };
