import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { GetMessageResponse } from "@/types/apiResponse";
import { getMessage } from "@/api/message";
import { Message } from "@/types";
import useValidatedParam from "@/hooks/useValidatedParam";

interface useReadMessageProps {
  messageId: Message["id"];
  isSuccess: boolean;
}

const useReadMessage = ({ messageId, isSuccess }: useReadMessageProps) => {
  const rollingpaperId = useValidatedParam<number>("rollingpaperId");

  return useQuery<GetMessageResponse, AxiosError>(
    ["message", messageId],
    () => getMessage({ rollingpaperId, messageId }),
    {
      enabled: isSuccess,
    }
  );
};

export default useReadMessage;
