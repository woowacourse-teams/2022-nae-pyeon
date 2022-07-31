import React from "react";
import styled from "@emotion/styled";

interface ReceivedRollingpaperCardProps {
  title: string;
  teamName: string;
}

const ReceivedRollingpaperCard = ({
  title,
  teamName,
}: ReceivedRollingpaperCardProps) => {
  return (
    <StyledReceivedRollingpaperCard>
      <StyledTitle>{title}</StyledTitle>
      <StyledTeamName>{teamName}</StyledTeamName>
    </StyledReceivedRollingpaperCard>
  );
};

const StyledReceivedRollingpaperCard = styled.div`
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

export default ReceivedRollingpaperCard;
