import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import useValidatedParam from "@/hooks/useValidatedParam";

import { queryClient } from "@/api";
import { postLike } from "@/api/message";

import { Message } from "@/types";
import { UpdateLikeResponse } from "@/types/apiResponse";

type UpdateLikeVariables = Message["id"];

const useUpdateLike = () => {
  const rollingpaperId = useValidatedParam<number>("rollingpaperId");

  return useMutation<UpdateLikeResponse, AxiosError, UpdateLikeVariables>(
    (id) => postLike({ rollingpaperId, id }),
    {
      onSuccess: () => {
        queryClient.refetchQueries(["rollingpaper", rollingpaperId]);
      },
    }
  );
};

export default useUpdateLike;
