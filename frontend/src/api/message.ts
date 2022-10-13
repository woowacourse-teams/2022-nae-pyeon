import { appClient, requestApi } from "@/api";

import {
  PostMessageRequest,
  PutMessageRequest,
  DeleteMessageRequest,
  PostLikeRequest,
  DeleteLikeRequest,
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

const postLike = async ({ rollingpaperId, id }: PostLikeRequest) =>
  requestApi(() =>
    appClient.post(`rollingpapers/${rollingpaperId}/messages/${id}/likes`)
  );

const deleteLike = async ({ rollingpaperId, id }: DeleteLikeRequest) =>
  requestApi(() =>
    appClient.delete(`rollingpapers/${rollingpaperId}/messages/${id}/likes`)
  );

export { putMessage, postMessage, deleteMessage, postLike, deleteLike };
