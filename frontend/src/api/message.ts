import { appClient } from "@/api";

interface PutMessageArgs {
  rollingpaperId: number;
  id: number | null;
  content: string;
  color: string;
}

interface DeleteMessageArgs {
  rollingpaperId: number;
  id: number;
}

const putMessage = ({ rollingpaperId, id, content, color }: PutMessageArgs) =>
  appClient
    .put(`/rollingpapers/${rollingpaperId}/messages/${id}`, {
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

const deleteMessage = ({ rollingpaperId, id }: DeleteMessageArgs) =>
  appClient
    .delete(`/rollingpapers/${rollingpaperId}/messages/${id}`)
    .then((response) => response.data);

export { putMessage, postMessage, deleteMessage };
