import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import styled from "@emotion/styled";
import axios from "axios";

import appClient from "@/api";

import RollingpaperList from "@/pages/TeamDetailPage/components/RollingpaperList";
import TeamJoinSection from "@/pages/TeamDetailPage/components/TeamJoinSection";

import { CustomError } from "@/types";
import MoreDropdown from "@/components/MoreDropdown";
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
    error: TeamDetailError,
    data: teamDetail,
  } = useQuery<Team>(["team"], () =>
    appClient.get(`/teams/${teamId}`).then((response) => response.data)
  );

  if (isLoadingTeamDetail) {
    return <div>로딩중</div>;
  }

  if (isErrorTeamDetail) {
    if (axios.isAxiosError(TeamDetailError) && TeamDetailError.response) {
      const customError = TeamDetailError.response.data as CustomError;
      return <div>{customError.message}</div>;
    }
    return <div>에러</div>;
  }

  if (!teamDetail) {
    return <div>에러</div>;
  }

  return (
    <StyledMain>
      <TeamDescriptionBox
        emoji={teamDetail.emoji}
        name={teamDetail.name}
        description={teamDetail.description}
        color={teamDetail.color}
        joined={teamDetail.joined}
      />
      {teamDetail.joined ? <RollingpaperList /> : <TeamJoinSection />}
    </StyledMain>
  );
};

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
      console.log("모임 프로필 설정");
    },
  },
];

const TeamDescriptionBox = ({
  name,
  description,
  emoji,
  color,
  joined,
}: TeamDescriptionBoxProps) => {
  return (
    <StyledTeamDescriptionContainer color={color}>
      <StyledHeader>
        <h3>{`${emoji} ${name}`}</h3>
        {joined && <MoreDropdown optionList={teamMoreOption} />}
      </StyledHeader>

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

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;

export default TeamDetailPage;
