import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import useValidatedParam from "@/hooks/useValidatedParam";

import { queryClient } from "@/api";
import { deleteLike } from "@/api/message";

import { Message } from "@/types";
import { DeleteLikeResponse } from "@/types/apiResponse";

type DeleteLikeVariables = Message["id"];

const useDeleteLike = () => {
  const rollingpaperId = useValidatedParam<number>("rollingpaperId");

  return useMutation<DeleteLikeResponse, AxiosError, DeleteLikeVariables>(
    (id) => deleteLike({ rollingpaperId, id }),
    {
      onSuccess: () => {
        queryClient.refetchQueries(["rollingpaper", rollingpaperId]);
      },
    }
  );
};

export default useDeleteLike;
