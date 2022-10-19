import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { queryClient } from "@/api";
import { putNotification } from "@/api/notification";

import { PutNotificationRequest } from "@/types/apiRequest";

const useDeleteNotification = () =>
  useMutation<null, AxiosError, PutNotificationRequest>(
    ({ id }) => putNotification({ id }),
    {
      onSuccess: () => {
        queryClient.refetchQueries(["notifications"]);
      },
    }
  );

export default useDeleteNotification;
