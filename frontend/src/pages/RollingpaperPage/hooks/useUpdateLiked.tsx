import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import useValidatedParam from "@/hooks/useValidatedParam";

import { queryClient } from "@/api";
import { postLike } from "@/api/message";

import { Message } from "@/types";

interface updateLikeResponse extends Pick<Message, "likes" | "liked"> {}

type updateLikeVariable = Message["id"];

const useUpdateLiked = () => {
  const rollingpaperId = useValidatedParam<number>("rollingpaperId");

  return useMutation<updateLikeResponse, AxiosError, updateLikeVariable>(
    (id) => postLike({ rollingpaperId, id }),
    {
      onSuccess: () => {
        queryClient.refetchQueries(["rollingpaper", rollingpaperId]);
      },
    }
  );
};

export default useUpdateLiked;
