import React from "react";
import styled from "@emotion/styled";

import NicknameEditModalForm from "@/pages/TeamDetailPage/components/NicknameEditModalForm";
import InviteModal from "@/pages/TeamDetailPage/components/InviteModal";

import useModal from "@/hooks/useModal";

import { Team } from "@/types";

const TeamDescriptionBox = ({
  name,
  description,
  emoji,
  color,
  joined,
}: Omit<Team, "id" | "nickname" | "secret">) => {
  const {
    isOpen: isTeamNicknameOpen,
    handleModalClose: handleTeamNicknameClose,
    handleModalOpen: handleTeamNicknameOpen,
  } = useModal();
  const {
    isOpen: isInviteOpen,
    handleModalClose: handleInviteClose,
    handleModalOpen: handleInviteOpen,
  } = useModal();

  return (
    <StyledTeamDescriptionContainer color={color}>
      <div>
        <StyledHeader>
          <h3>{`${emoji} ${name}`}</h3>
        </StyledHeader>
        <p>{description}</p>
      </div>
      {isTeamNicknameOpen && (
        <NicknameEditModalForm onClickCloseButton={handleTeamNicknameClose} />
      )}
      {isInviteOpen && <InviteModal onClickClose={handleInviteClose} />}
      {joined && (
        <StyledButtonContainer color={color}>
          <button onClick={handleInviteOpen}>초대하기</button>
          <button onClick={handleTeamNicknameOpen}>모임 프로필 설정</button>
        </StyledButtonContainer>
      )}
    </StyledTeamDescriptionContainer>
  );
};

const StyledTeamDescriptionContainer = styled.div<Pick<Team, "color">>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 90%;
  min-height: 200px;
  padding: 20px 16px;
  border-radius: 8px;
  background-color: ${({ color }) => `${color}AB`};

  h3 {
    font-size: 32px;
    margin-bottom: 10px;
  }
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;

const StyledButtonContainer = styled.div<Pick<Team, "color">>`
  position: relative;
  top: 10px;
  display: flex;
  gap: 12px;
  align-self: flex-end;

  button {
    padding: 10px;

    font-size: 16px;
    background-color: ${({ color }) => `${color}AB`};
    border-radius: 4px;

    &:hover {
      background-color: ${({ color }) => color};
    }
  }
`;

export default TeamDescriptionBox;
