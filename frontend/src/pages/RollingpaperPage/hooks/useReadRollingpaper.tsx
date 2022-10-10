import React from "react";

import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { getRollingpaper } from "@/api/rollingpaper";

import { GetRollingpaperResponse } from "@/types/apiResponse";
import { Message } from "@/types";

interface UseReadRollingpaperArgs {
  teamId: number;
  rollingpaperId: number;
  setMessageList: React.Dispatch<React.SetStateAction<Message[]>>;
}

export const useReadRollingpaper = ({
  teamId,
  rollingpaperId,
  setMessageList,
}: UseReadRollingpaperArgs) =>
  useQuery<GetRollingpaperResponse, AxiosError>(
    ["rollingpaper", rollingpaperId],
    () => getRollingpaper({ teamId, id: rollingpaperId }),
    {
      onSuccess: (data) => setMessageList(data.messages),
    }
  );
