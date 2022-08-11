import { appClient } from "@/api";

interface PutMessageArgs {
  rollingpaperId: number;
  editMessageId: number | null;
  content: string;
  color: string;
}

interface DeleteMessageArgs {
  rollingpaperId: number;
  messageId: number;
}

const putMessage = ({
  rollingpaperId,
  editMessageId,
  content,
  color,
}: PutMessageArgs) =>
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
}: Partial<PutMessageArgs>) =>
  appClient
    .post(`/rollingpapers/${rollingpaperId}/messages`, {
      content,
      color,
    })
    .then((response) => response.data);

const deleteMessage = ({ rollingpaperId, messageId }: DeleteMessageArgs) =>
  appClient
    .delete(`/rollingpapers/${rollingpaperId}/messages/${messageId}`)
    .then((response) => response.data);

export { putMessage, postMessage, deleteMessage };
