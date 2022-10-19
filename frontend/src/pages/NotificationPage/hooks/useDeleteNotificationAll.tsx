import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { putNotificationsAll } from "@/api/notification";

const useDeleteNotificationsAll = () =>
  useMutation<null, AxiosError>(() => putNotificationsAll());

export default useDeleteNotificationsAll;
