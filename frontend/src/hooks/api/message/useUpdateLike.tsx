import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { queryClient } from "@/api";
import { postLike } from "@/api/message";

import { PostLikeResponse } from "@/types/apiResponse";
import { PostLikeRequest } from "@/types/apiRequest";

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

export default useUpdateLike;
