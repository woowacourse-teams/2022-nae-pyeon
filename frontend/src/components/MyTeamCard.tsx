import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

interface MyTeamCardProps {
  id: number;
  name: string;
  description: string;
  emoji: string;
  color: string;
}

interface StyledMyTeamCardProps {
  color: string;
}

const MyTeamCard = ({
  id,
  name,
  description,
  emoji,
  color,
}: MyTeamCardProps) => {
  return (
    <Link to={`team/${id}`}>
      <StyledMyTeamCard color={color}>
        <StyledEmoji color={color}>{emoji}</StyledEmoji>
        <StyledName>{name}</StyledName>
        <StyledDescription>{description}</StyledDescription>
      </StyledMyTeamCard>
    </Link>
  );
};

const StyledMyTeamCard = styled.div<StyledMyTeamCardProps>`
  display: flex;
  flex-direction: column;

  width: 150px;
  height: 190px;

  padding: 20px 14px;
  border-radius: 8px;

  background-color: ${(props) => `${props.color}AB`};

  transition-duration: 0.3s;

  cursor: pointer;

  &:hover {
    transform: scale(1.02);
    transition: transform 0.3s ease;
  }
`;

const StyledEmoji = styled.div<StyledMyTeamCardProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 50px;
  height: 50px;

  border-radius: 8px;
  background-color: ${(props) => `${props.color}`};

  font-size: 30px;
`;

const StyledName = styled.h2`
  margin-top: 20px;

  font-size: 24px;
  font-weight: 600;
`;

const StyledDescription = styled.div`
  margin-top: 4px;

  font-size: 14px;
`;

export default MyTeamCard;
