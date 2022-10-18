import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { postTeam } from "@/api/team";

import { PostTeamResponse } from "@/types/apiResponse";
import { PostTeamRequest } from "@/types/apiRequest";

const useCreateTeam = () => {
  const navigate = useNavigate();

  return useMutation<PostTeamResponse, AxiosError, PostTeamRequest>(
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
};

export default useCreateTeam;
