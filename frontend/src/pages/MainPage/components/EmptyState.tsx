import React from "react";
import { useNavigate } from "react-router-dom";

import EmptyStateImg from "@/assets/images/empty_state.svg";
import LineButton from "@/components/LineButton";

const EmptyState = () => {
  const navigate = useNavigate();

  const handleJoinTeamButtonClick = () => {
    navigate("/search");
  };

  const handleCreateTeamButtonClick = () => {
    navigate("/team/new");
  };

  return (
    <>
      <EmptyStateImg />
      <LineButton onClick={handleJoinTeamButtonClick}>
        참가할 모임 찾기
      </LineButton>
      <LineButton onClick={handleCreateTeamButtonClick}>
        새 모임 만들기
      </LineButton>
    </>
  );
};

export default EmptyState;
