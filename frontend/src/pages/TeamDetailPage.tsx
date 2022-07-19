import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styled from "@emotion/styled";

import appClient from "@/api";

import TeamRollingpaperList from "@/components/TeamRollingpaperList";
import TeamJoinSection from "@/components/TeamJoinSection";
import RequireLogin from "@/components/RequireLogin";

import { Rollingpaper } from "@/types";

interface Team {
  id: number;
  name: string;
  description: string;
  emoji: string;
  color: string;
  joined: boolean;
}

const TeamDetailPage = () => {
  const { teamId } = useParams();

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
  } = useQuery<Omit<Rollingpaper, "messages">[]>(["rollingpaperList"], () =>
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
    <RequireLogin>
      <StyledMain>
        <TeamDescriptionBox
          emoji={teamDetail.emoji}
          name={teamDetail.name}
          description={teamDetail.description}
          color={teamDetail.color}
        />
        {teamDetail.joined ? (
          <TeamRollingpaperList rollingpapers={rollingpaperList} />
        ) : (
          <TeamJoinSection />
        )}
      </StyledMain>
    </RequireLogin>
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
    margin-bottom: 10px;
  }
`;

export default TeamDetailPage;
