import axios from "axios";

import { appClient } from "@/api";
import ApiError from "@/util/ApiError";

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

const postMessage = async ({
  rollingpaperId,
  content,
  color,
  anonymous,
  secret,
}: Partial<PutMessageRequest>) => {
  try {
    const { data } = await appClient.post(
      `/rollingpapers/${rollingpaperId}/messages`,
      {
        content,
        color,
        anonymous,
        secret,
      }
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const customError = error.response.data as ApiError;
      throw new ApiError(customError.errorCode, customError.message);
    }
  }
};

const putMessage = async ({
  rollingpaperId,
  id,
  content,
  color,
  anonymous,
  secret,
}: PutMessageRequest) => {
  try {
    const { data } = await appClient.put(
      `/rollingpapers/${rollingpaperId}/messages/${id}`,
      {
        content,
        color,
        anonymous,
        secret,
      }
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const customError = error.response.data as ApiError;
      throw new ApiError(customError.errorCode, customError.message);
    }
  }
};

const deleteMessage = async ({ rollingpaperId, id }: DeleteMessageRequest) => {
  try {
    const { data } = await appClient.delete(
      `/rollingpapers/${rollingpaperId}/messages/${id}`
    );

    return { data };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const customError = error.response.data as ApiError;
      throw new ApiError(customError.errorCode, customError.message);
    }
  }
};

export { putMessage, postMessage, deleteMessage };
