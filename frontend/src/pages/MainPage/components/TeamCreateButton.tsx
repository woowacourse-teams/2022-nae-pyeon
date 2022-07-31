import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

import PlusIcon from "@/assets/icons/bx-plus.svg";

const TeamCreateButton = () => {
  const navigate = useNavigate();

  return (
    <StyledTeamCreateButton>
      <PlusIcon
        onClick={() => {
          navigate("team/new");
        }}
      />
    </StyledTeamCreateButton>
  );
};

const StyledTeamCreateButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 40px;
  height: 40px;

  border-radius: 4px;

  background-color: ${({ theme }) => theme.colors.SKY_BLUE_300};

  font-size: 30px;

  box-shadow: 0px 4px 4px 0px ${({ theme }) => `${theme.colors.BLACK}1f`};

  &:hover {
    background-color: ${({ theme }) => theme.colors.SKY_BLUE_400};
  }

  svg {
    fill: ${({ theme }) => theme.colors.WHITE};
  }
`;

export default TeamCreateButton;
