import React from "react";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

import appClient from "@/api";

import RollingpaperList from "@/components/RollingpaperList";
import TeamJoinSection from "@/components/TeamJoinSection";

interface Team {
  id: number;
  name: string;
  description: string;
  emoji: string;
  color: string;
  joined: boolean;
}

interface Rollingpaper {
  id: number;
  title: string;
  to: string;
}

const TeamDetailPage = () => {
  const { teamId } = useParams();
  const navigate = useNavigate();

  const {
    isLoading: isLoadingTeamDetail,
    isError: isErrorTeamDetail,
    data: teamDetail,
  } = useQuery<Team>(["team"], () =>
    appClient.get(`/teams/${teamId}`).then((response) => response.data)
  );

  const {
    isLoading: isLoadingGetTeamRollingpaperList,
    isError: isErrorGetTeamRollingpaperList,
    data: rollingpaperList,
  } = useQuery<Rollingpaper[]>(["rollingpaperList"], () =>
    appClient
      .get(`/teams/${teamId}/rollingpapers`)
      .then((response) => response.data)
  );

  if (isLoadingTeamDetail || isLoadingGetTeamRollingpaperList) {
    return <div>로딩중</div>;
  }

  if (
    isErrorTeamDetail ||
    !teamDetail ||
    isErrorGetTeamRollingpaperList ||
    !rollingpaperList
  ) {
    return <div>에러</div>;
  }

  return (
    <StyledMain>
      <TeamDescriptionBox
        emoji={teamDetail.emoji}
        name={teamDetail.name}
        description={teamDetail.description}
        color={teamDetail.color}
      />
      {teamDetail.joined ? (
        <RollingpaperList rollingpapers={rollingpaperList} />
      ) : (
        <TeamJoinSection />
      )}
    </StyledMain>
  );
};

interface TeamDescriptionBoxProps {
  name: string;
  description: string;
  emoji: string;
  color: string;
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
}: TeamDescriptionBoxProps) => {
  return (
    <StyledTeamDescriptionContainer color={color}>
      <h3>{`${emoji} ${name}`}</h3>
      <p>{description}</p>
    </StyledTeamDescriptionContainer>
  );
};

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 40px;

  padding: 28px 0;
`;

const StyledTeamDescriptionContainer = styled.div<StyledTeamDescriptionContainerProps>`
  width: 80%;

  padding: 28px 16px;
  border-radius: 8px;
  background-color: ${({ color }) => `${color}AB`};

  h3 {
    font-size: 32px;
  }
`;

export default TeamDetailPage;
