import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { getNotifications } from "@/api/notification";
import { GetNotificationResponse } from "@/types/apiResponse";

const useReadNotifications = () =>
  useQuery<GetNotificationResponse, AxiosError>(["notification"], () =>
    getNotifications()
  );

export default useReadNotifications;
