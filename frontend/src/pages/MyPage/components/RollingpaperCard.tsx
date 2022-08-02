import React from "react";
import styled from "@emotion/styled";

interface RollingpaperCardProps {
  title: string;
  teamName: string;
}

const RollingpaperCard = ({ title, teamName }: RollingpaperCardProps) => {
  return (
    <StyledRollingpaperCard>
      <StyledTitle>{title}</StyledTitle>
      <StyledTeamName>{teamName}</StyledTeamName>
    </StyledRollingpaperCard>
  );
};

const StyledRollingpaperCard = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  border: 2px solid ${({ theme }) => theme.colors.SKY_BLUE_300};
  border-radius: 8px;

  padding: 30px 20px;
  gap: 8px;

  cursor: pointer;

  &:hover {
    border: 2px solid ${({ theme }) => theme.colors.SKY_BLUE_400};
  }
`;

const StyledTitle = styled.div`
  font-weight: 600;
  font-size: 16px;
`;

const StyledTeamName = styled.div`
  font-size: 14px;
`;

export default RollingpaperCard;
