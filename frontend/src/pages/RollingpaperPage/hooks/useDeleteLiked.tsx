import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import useValidatedParam from "@/hooks/useValidatedParam";

import { queryClient } from "@/api";
import { deleteLike } from "@/api/message";

import { Message } from "@/types";

interface deleteLikeResponse extends Pick<Message, "likes" | "liked"> {}

type deleteLikeVariable = Message["id"];

const useDeleteLiked = () => {
  const rollingpaperId = useValidatedParam<number>("rollingpaperId");

  return useMutation<deleteLikeResponse, AxiosError, deleteLikeVariable>(
    (id) => deleteLike({ rollingpaperId, id }),
    {
      onSuccess: () => {
        queryClient.refetchQueries(["rollingpaper", rollingpaperId]);
      },
    }
  );
};

export default useDeleteLiked;
