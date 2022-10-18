import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { queryClient } from "@/api";
import { deleteLike } from "@/api/message";

import { DeleteLikeResponse } from "@/types/apiResponse";
import { DeleteLikeRequest } from "@/types/apiRequest";

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

export default useDeleteLike;
