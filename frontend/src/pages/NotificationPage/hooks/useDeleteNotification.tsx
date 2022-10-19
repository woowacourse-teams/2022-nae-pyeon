import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { putNotification } from "@/api/notification";

import { PutNotificationRequest } from "@/types/apiRequest";

const useDeleteNotification = () =>
  useMutation<null, AxiosError, PutNotificationRequest>(({ id }) =>
    putNotification({ id })
  );

export default useDeleteNotification;
