import React from "react";
import styled from "@emotion/styled";

interface TeamDescriptionProp {
  color: string;
  emoji: string;
  name: string;
  description: string;
}

const TeamDescription = ({
  color,
  emoji,
  name,
  description,
}: TeamDescriptionProp) => {
  return (
    <StyledTeamDescription color={color}>
      <StyledEmoji>{emoji}</StyledEmoji>
      <StyledTitle>{name}</StyledTitle>
      <StyledDescription>{description}</StyledDescription>
    </StyledTeamDescription>
  );
};

const StyledTeamDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  width: 90%;
  min-height: 200px;

  padding: 20px 16px;
  border-radius: 8px;

  background-color: ${(prop) => `${prop.color}AB`};
`;

const StyledEmoji = styled.div`
  font-size: 32px;
`;

const StyledTitle = styled.h3`
  font-size: 32px;
  font-weight: 600;
`;

const StyledDescription = styled.div``;

export default TeamDescription;
