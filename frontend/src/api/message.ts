import { appClient, requestApi } from "@/api";

import { ApiOptions } from "@/types";

interface PutMessageRequest {
  rollingpaperId: number;
  id: number | null;
  content: string;
  color: string;
  anonymous: boolean;
  secret: boolean;
}

interface DeleteMessageRequest {
  rollingpaperId: number;
  id: number;
}

const postMessage = async (
  {
    rollingpaperId,
    content,
    color,
    anonymous,
    secret,
  }: Partial<PutMessageRequest>,
  options?: ApiOptions
) =>
  requestApi(
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
