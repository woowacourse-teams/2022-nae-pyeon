import { appClient } from "@/api";

interface PutMessageProp {
  rollingpaperId: number;
  editMessageId: number | null;
  content: string;
  color: string;
}

interface DeleteMessageProp {
  rollingpaperId: number;
  messageId: number;
}

const putMessage = ({
  rollingpaperId,
  editMessageId,
  content,
  color,
}: PutMessageProp) =>
  appClient
    .put(`/rollingpapers/${rollingpaperId}/messages/${editMessageId}`, {
      content,
      color,
    })
    .then((response) => response.data);

const postMessage = ({
  rollingpaperId,
  content,
  color,
}: Partial<PutMessageProp>) =>
  appClient
    .post(`/rollingpapers/${rollingpaperId}/messages`, {
      content,
      color,
    })
    .then((response) => response.data);

const deleteRollingpaperMessage = ({
  rollingpaperId,
  messageId,
}: DeleteMessageProp) =>
  appClient
    .delete(`/rollingpapers/${rollingpaperId}/messages/${messageId}`)
    .then((response) => response.data);

export { putMessage, postMessage, deleteRollingpaperMessage };
