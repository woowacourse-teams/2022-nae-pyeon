import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { getNotifications } from "@/api/notification";
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

export default useReadNotifications;
