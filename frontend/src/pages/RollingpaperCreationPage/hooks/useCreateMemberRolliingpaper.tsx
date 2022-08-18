import React from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { postMemberRollingpaper } from "@/api/rollingpaper";

import { useSnackbar } from "@/context/SnackbarContext";

import { Rollingpaper, CustomError } from "@/types";
import { useNavigate } from "react-router-dom";

const useCreateMemberRollingpaper = (teamId: number) => {
  const { openSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const { mutate: createMemberRollingpaper } = useMutation(
    ({
      title,
      addresseeId,
    }: Pick<Rollingpaper, "title"> & { addresseeId: number }) => {
      return postMemberRollingpaper({ teamId, title, addresseeId });
    },
    {
      onSuccess: () => {
        navigate(`/team/${teamId}`);
        openSnackbar("롤링페이퍼 생성 완료");
      },
      onError: (error) => {
        if (axios.isAxiosError(error) && error.response) {
          const customError = error.response.data as CustomError;
          alert(customError.message);
        }
      },
    }
  );

  return createMemberRollingpaper;
};

export default useCreateMemberRollingpaper;
