import React from "react";
import styled from "@emotion/styled";

interface TeamDescriptionBoxProp {
  color: string;
  emoji: string;
  name: string;
  description: string;
}

const TeamDescriptionBox = ({
  color,
  emoji,
  name,
  description,
}: TeamDescriptionBoxProp) => {
  return (
    <StyledTeamDescriptionBox color={color}>
      <h3>{`${emoji} ${name}`}</h3>
      <StyledDescription>{description}</StyledDescription>
    </StyledTeamDescriptionBox>
  );
};

const StyledTeamDescriptionBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  width: 90%;
  min-height: 200px;

  padding: 20px 16px;
  border-radius: 8px;

  background-color: ${(prop) => `${prop.color}AB`};

  h3 {
    margin-top: 10px;

    font-size: 32px;
    font-weight: 600;
  }
`;

const StyledDescription = styled.div``;

export default TeamDescriptionBox;
