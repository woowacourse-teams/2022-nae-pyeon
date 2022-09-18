import { appClient, requestApi } from "@/api";

import { ApiOptions } from "@/types/api";

import {
  PostMessageRequest,
  PutMessageRequest,
  DeleteMessageRequest,
} from "@/types/apiRequest";

import { PostMessageResponse } from "@/types/apiResponse";

const postMessage = async (
  { rollingpaperId, content, color, anonymous, secret }: PostMessageRequest,
  options?: ApiOptions
) =>
  requestApi<PostMessageResponse>(
    () =>
      appClient.post(`/rollingpapers/${rollingpaperId}/messages`, {
        content,
        color,
        anonymous,
        secret,
      }),
    options
  );

const putMessage = async (
  { rollingpaperId, id, content, color, anonymous, secret }: PutMessageRequest,
  options?: ApiOptions
) =>
  requestApi(
    () =>
      appClient.put(`/rollingpapers/${rollingpaperId}/messages/${id}`, {
        content,
        color,
        anonymous,
        secret,
      }),
    options
  );

const deleteMessage = async (
  { rollingpaperId, id }: DeleteMessageRequest,
  options?: ApiOptions
) =>
  requestApi(
    () => appClient.delete(`/rollingpapers/${rollingpaperId}/messages/${id}`),
    options
  );

export { putMessage, postMessage, deleteMessage };
