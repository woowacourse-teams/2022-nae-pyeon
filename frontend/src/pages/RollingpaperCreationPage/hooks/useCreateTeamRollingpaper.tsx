import React from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { postTeamRollingpaper } from "@/api/rollingpaper";

import { useSnackbar } from "@/context/SnackbarContext";

import { Rollingpaper, CustomError } from "@/types";
import { useNavigate } from "react-router-dom";

const useCreateTeamRollingpaper = (teamId: number) => {
  const { openSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const { mutate: createTeamRollingpaper } = useMutation(
    ({ title }: Pick<Rollingpaper, "title">) => {
      return postTeamRollingpaper({ teamId, title });
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

  return createTeamRollingpaper;
};

export default useCreateTeamRollingpaper;
