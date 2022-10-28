import { AxiosError } from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";

import { queryClient } from "@/api";
import {
  getNotifications,
  putNotification,
  putNotificationsAll,
} from "@/api/notification";

import { PutNotificationRequest } from "@/types/apiRequest";

import { GetNotificationResponse } from "@/types/apiResponse";

interface UseReadNotificationsParams {
  onSuccess?: ((data: GetNotificationResponse) => void) | undefined;
}

const useReadNotifications = ({ onSuccess }: UseReadNotificationsParams) =>
  useQuery<GetNotificationResponse, AxiosError>(
    ["notifications"],
    () => getNotifications(),
    {
      onSuccess: (data) => {
        onSuccess && onSuccess(data);
      },
    }
  );

const useDeleteNotification = () =>
  useMutation<null, AxiosError, PutNotificationRequest>(
    ({ id }) => putNotification({ id }),
    {
      onSuccess: () => {
        queryClient.refetchQueries(["notifications"]);
      },
    }
  );

const useDeleteNotificationsAll = () =>
  useMutation<null, AxiosError>(() => putNotificationsAll(), {
    onSuccess: () => {
      queryClient.refetchQueries(["notifications"]);
    },
  });

export {
  useReadNotifications,
  useDeleteNotification,
  useDeleteNotificationsAll,
};
