import { appClient } from "@/api";

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

const putMessage = ({
  rollingpaperId,
  id,
  content,
  color,
  anonymous,
  secret,
}: PutMessageRequest) =>
  appClient
    .put(`/rollingpapers/${rollingpaperId}/messages/${id}`, {
      content,
      color,
      anonymous,
      secret,
    })
    .then((response) => response.data);

const postMessage = ({
  rollingpaperId,
  content,
  color,
  anonymous,
  secret,
}: Partial<PutMessageRequest>) =>
  appClient
    .post(`/rollingpapers/${rollingpaperId}/messages`, {
      content,
      color,
      anonymous,
      secret,
    })
    .then((response) => response.data);

const deleteMessage = ({ rollingpaperId, id }: DeleteMessageRequest) =>
  appClient
    .delete(`/rollingpapers/${rollingpaperId}/messages/${id}`)
    .then((response) => response.data);

export { putMessage, postMessage, deleteMessage };
