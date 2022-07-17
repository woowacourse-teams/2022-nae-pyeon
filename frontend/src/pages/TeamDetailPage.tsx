import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import RollingpaperList from "@/components/RollingpaperList";
import TeamJoinSection from "@/components/TeamJoinSection";

const dummyRollingpapers = [
  {
    id: 1,
    title: "우테코 고마워",
    to: "우아한테크코스",
  },
  {
    id: 2,
    title: "소피아 생일 축하해 🎉",
    to: "소피아",
  },
  {
    id: 3,
    title: "오늘의 내 편 데일리 미팅",
    to: "내 편",
  },
  {
    id: 4,
    title: "이번 주 우리의 한 마디",
    to: "우아한테크코스",
  },
];

const TeamDetailPage = () => {
  const { teamId } = useParams();
  const navigate = useNavigate();

  return (
    <StyledMain>
      <TeamDescriptionBox
        emoji="💕"
        title="테스트"
        description="테스트용 모임 설명이다다ㅏㅏㅏㅏㅏㅏ테스트용 모임 설명이다다ㅏㅏㅏㅏㅏㅏ테스트용 모임 설명이다다ㅏㅏㅏㅏㅏㅏ테스트용 모임 설명이다다ㅏㅏㅏㅏㅏㅏ테스트용 모임 설명이다다ㅏㅏㅏㅏㅏㅏ"
      />
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
