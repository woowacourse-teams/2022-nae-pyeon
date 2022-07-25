import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

import { BiPlus } from "react-icons/bi";

const TeamCreateButton = () => {
  const navigate = useNavigate();

  return (
    <StyledTeamCreateButton>
      <BiPlus
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
  color: ${({ theme }) => theme.colors.WHITE};

  font-size: 30px;

  box-shadow: 0px 4px 4px 0px ${({ theme }) => `${theme.colors.BLACK}1f`};

  &:hover {
    background-color: ${({ theme }) => theme.colors.SKY_BLUE_400};
  }
`;

export default TeamCreateButton;
