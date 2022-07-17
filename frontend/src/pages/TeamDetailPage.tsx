import React from "react";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

import appClient from "@/api";

import RollingpaperList from "@/components/RollingpaperList";
import TeamJoinSection from "@/components/TeamJoinSection";

interface Rollingpaper {
  id: number;
  title: string;
  to: string;
}

const TeamDetailPage = () => {
  const { teamId } = useParams();
  const navigate = useNavigate();

  const {
    isLoading: isLoadingGetTeamRollingpaperList,
    isError: isErrorGetTeamRollingpaperList,
    data: rollingpaperList,
  } = useQuery<Rollingpaper[]>(["rollingpaperList"], () =>
    appClient
      .get(`/teams/${teamId}/rollingpapers`)
      .then((response) => response.data)
  );

  if (isLoadingGetTeamRollingpaperList) {
    return <div>로딩중</div>;
  }

  if (isErrorGetTeamRollingpaperList || !rollingpaperList) {
    return <div>에러</div>;
  }

  return (
    <StyledMain>
      <TeamDescriptionBox
        emoji="💕"
        title="테스트"
        description="테스트용 모임 설명이다다ㅏㅏㅏㅏㅏㅏ테스트용 모임 설명이다다ㅏㅏㅏㅏㅏㅏ테스트용 모임 설명이다다ㅏㅏㅏㅏㅏㅏ테스트용 모임 설명이다다ㅏㅏㅏㅏㅏㅏ테스트용 모임 설명이다다ㅏㅏㅏㅏㅏㅏ"
      />
      <RollingpaperList rollingpapers={rollingpaperList} />
      <TeamJoinSection />
    </StyledMain>
  );
};

interface TeamDescriptionBoxProp {
  emoji: string;
  title: string;
  description: string;
}

const TeamDescriptionBox = ({
  emoji,
  title,
  description,
}: TeamDescriptionBoxProp) => {
  return (
    <StyledTeamDescriptionContainer>
      <h3>{`${emoji} ${title}`}</h3>
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

const StyledTeamDescriptionContainer = styled.div`
  width: 80%;

  padding: 28px 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.YELLOW_200};

  h3 {
    font-size: 32px;
  }
`;

export default TeamDetailPage;
