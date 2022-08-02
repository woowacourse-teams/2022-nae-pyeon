import React, { useState } from "react";
import styled from "@emotion/styled";

import Dropdown from "@/components/Dropdown";

import TeamNicknameModalForm from "@/pages/TeamDetailPage/components/TeamNicknameModalForm";

import MeatballIcon from "@/assets/icons/bx-dots-horizontal-rounded.svg";
interface TeamDescriptionBoxProps {
  name: string;
  description: string;
  emoji: string;
  color: string;
  joined: boolean;
}

type StyledTeamDescriptionContainerProps = Pick<
  TeamDescriptionBoxProps,
  "color"
>;

const TeamDescriptionBox = ({
  name,
  description,
  emoji,
  color,
  joined,
}: TeamDescriptionBoxProps) => {
  const [isNicknameEditOpen, setIsNicknameEditOpen] = useState(false);

  const teamMoreOption = [
    {
      option: "초대하기",
      callback: () => {
        console.log("초대하기");
      },
    },
    {
      option: "모임 프로필 설정",
      callback: () => {
        setIsNicknameEditOpen(true);
      },
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
      {isNicknameEditOpen && (
        <TeamNicknameModalForm
          mode="edit"
          onClickCloseButton={() => setIsNicknameEditOpen(false)}
        />
      )}
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
