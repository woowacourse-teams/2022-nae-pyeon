import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { CustomError, Team } from "@/types";
import { postTeam } from "@/api/team";

const useCreateTeam = () => {
  const navigate = useNavigate();

  const { mutate: createTeam } = useMutation(
    ({
      name,
      description,
      emoji,
      color,
      nickname,
      secret,
    }: Omit<Team, "id" | "joined">) => {
      return postTeam({
        name,
        description,
        emoji,
        color,
        nickname,
        secret,
      });
    },
    {
      onSuccess: () => {
        navigate("/");
      },
      onError: (error) => {
        if (axios.isAxiosError(error) && error.response) {
          const customError = error.response.data as CustomError;
          alert(customError.message);
        }
      },
    }
  );

  return createTeam;
};

export default useCreateTeam;
