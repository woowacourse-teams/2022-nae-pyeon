import React from "react";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { postTeam } from "@/api/team";

import { PostTeamResponse } from "@/types/apiResponse";
import { Team, TeamMember } from "@/types";

interface CreateTeamVariables extends Omit<Team, "id" | "joined"> {
  nickname: TeamMember["nickname"];
}

const useCreateTeam = () => {
  const navigate = useNavigate();

  const { mutate: createTeam } = useMutation<
    PostTeamResponse,
    AxiosError,
    CreateTeamVariables
  >(
    ({ name, description, emoji, color, nickname, secret }) => {
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
    }
  );

  return createTeam;
};

export default useCreateTeam;
