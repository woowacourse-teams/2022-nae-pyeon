import React from "react";
import styled from "@emotion/styled";

import Dropdown from "@/components/Dropdown";
import NicknameEditModalForm from "@/pages/TeamDetailPage/components/NicknameEditModalForm";
import InviteModal from "@/pages/TeamDetailPage/components/InviteModal";

import useModal from "@/hooks/useModal";

import MeatballIcon from "@/assets/icons/bx-dots-horizontal-rounded.svg";

import { Team } from "@/types";

type StyledTeamDescriptionContainerProps = Pick<Team, "color">;

const TeamDescriptionBox = ({
  name,
  description,
  emoji,
  color,
  joined,
}: Omit<Team, "id" | "nickname">) => {
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

  const teamMoreOption = [
    {
      option: "초대하기",
      callback: handleInviteOpen,
    },
    {
      option: "모임 프로필 설정",
      callback: handleTeamNicknameOpen,
    },
  ];

  return (
    <StyledTeamDescriptionContainer color={color}>
      <StyledHeader>
        <h3>{`${emoji} ${name}`}</h3>
        {joined && (
          <Dropdown
            DropdownButton={<MeatballIcon />}
            optionList={teamMoreOption}
          />
        )}
      </StyledHeader>
      <p>{description}</p>
      {isTeamNicknameOpen && (
        <NicknameEditModalForm onClickCloseButton={handleTeamNicknameClose} />
      )}
      {isInviteOpen && <InviteModal onClickClose={handleInviteClose} />}
    </StyledTeamDescriptionContainer>
  );
};

const StyledTeamDescriptionContainer = styled.div<StyledTeamDescriptionContainerProps>`
  width: 90%;
  min-height: 150px;
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

export default TeamDescriptionBox;
