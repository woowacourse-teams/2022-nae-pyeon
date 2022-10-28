import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { useSnackbar } from "@/context/SnackbarContext";

import { queryClient } from "@/api";
import {
  postMessage,
  postLike,
  putMessage,
  deleteMessage,
  deleteLike,
} from "@/api/message";

import {
  PostMessageRequest,
  PostLikeRequest,
  DeleteMessageRequest,
  DeleteLikeRequest,
  PutMessageRequest,
} from "@/types/apiRequest";

import {
  PostMessageResponse,
  DeleteLikeResponse,
  PostLikeResponse,
} from "@/types/apiResponse";

const useCreateMessage = () => {
  const { openSnackbar } = useSnackbar();

  return useMutation<PostMessageResponse, AxiosError, PostMessageRequest>(
    ({ rollingpaperId, content, color, anonymous, secret }) => {
      return postMessage({
        rollingpaperId,
        content,
        color,
        anonymous,
        secret,
      });
    },
    {
      onSuccess: (data, variables) => {
        queryClient.refetchQueries(["rollingpaper", variables.rollingpaperId]);
        openSnackbar("메시지 작성 완료");
      },
    }
  );
};

const useUpdateMessage = () => {
  const { openSnackbar } = useSnackbar();

  return useMutation<null, AxiosError, PutMessageRequest>(
    ({ rollingpaperId, id, content, color, anonymous, secret }) => {
      return putMessage({
        rollingpaperId,
        id,
        content,
        color,
        anonymous,
        secret,
      });
    },
    {
      onSuccess: (data, variables) => {
        queryClient.refetchQueries(["rollingpaper", variables.rollingpaperId]);
        openSnackbar("메시지 수정 완료");
      },
    }
  );
};

const useUpdateLike = () => {
  return useMutation<PostLikeResponse, AxiosError, PostLikeRequest>(
    ({ rollingpaperId, id }) => postLike({ rollingpaperId, id }),
    {
      onSuccess: (data, variables) => {
        queryClient.refetchQueries(["rollingpaper", variables.rollingpaperId]);
      },
    }
  );
};

const useDeleteMessage = () => {
  const { openSnackbar } = useSnackbar();

  return useMutation<null, AxiosError, DeleteMessageRequest>(
    ({ rollingpaperId, id }) => deleteMessage({ rollingpaperId, id }),
    {
      onSuccess: (data, variables) => {
        queryClient.refetchQueries(["rollingpaper", variables.rollingpaperId]);
        openSnackbar("메시지 삭제 완료");
      },
    }
  );
};

const useDeleteLike = () => {
  return useMutation<DeleteLikeResponse, AxiosError, DeleteLikeRequest>(
    ({ rollingpaperId, id }) => deleteLike({ rollingpaperId, id }),
    {
      onSuccess: (data, variables) => {
        queryClient.refetchQueries(["rollingpaper", variables.rollingpaperId]);
      },
    }
  );
};

export {
  useCreateMessage,
  useUpdateMessage,
  useUpdateLike,
  useDeleteLike,
  useDeleteMessage,
};
