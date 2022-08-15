import React from "react";
import { useNavigate } from "react-router-dom";

import { useSnackbar } from "@/context/SnackbarContext";
import { Team } from "@/types";

const useCheckTeamJoined = () => {
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbar();

  const checkTeamJoined = (teamDetail: Team) => {
    if (teamDetail.joined) {
      openSnackbar("이미 가입한 모임입니다.");
      navigate(`/team/${teamDetail.id}`, {
        replace: true,
      });
    }
  };

  return checkTeamJoined;
};

export default useCheckTeamJoined;
