import React from "react";
import styled from "@emotion/styled";

import RollingpaperListItem from "@/pages/TeamDetailPage/components/RollingpaperListItem";
import IconButton from "@/components/IconButton";
import LineButton from "@/components/LineButton";
import NicknameCreateModalForm from "@/pages/TeamDetailPage/components/NicknameCreateModalForm";

import PlusIcon from "@/assets/icons/bx-plus.svg";
import useModal from "@/hooks/useModal";

const dummyRollingpapers = [
  {
    id: 1,
    title: "우테코 고마워",
    to: "우아한테크코스",
  },
  {
    id: 2,
    title: "오늘의 내 편 데일리 미팅",
    to: "내 편",
  },
  {
    id: 3,
    title: "이번 주 우리의 한 마디",
    to: "우아한테크코스",
  },
];

const TeamJoinSection = () => {
  const { isOpen, handleModalClose, handleModalOpen } = useModal();

  return (
    <StyledRollingpaperListContainer>
      <StyledDimmer />
      <StyledTeamJoinModal>
        <p>롤링페이퍼를 확인하려면 모임에 참여해주세요</p>
        <LineButton onClick={handleModalOpen}>참여 요청하기</LineButton>
      </StyledTeamJoinModal>
      <StyledRollingpaperListHead>
        <h4>롤링페이퍼 목록</h4>
        <IconButton size="small">
          <PlusIcon />
        </IconButton>
      </StyledRollingpaperListHead>
      <StyledRollingpaperList>
        {dummyRollingpapers.map((rollingpaper) => (
          <RollingpaperListItem key={rollingpaper.id} {...rollingpaper} />
        ))}
      </StyledRollingpaperList>
      {isOpen && (
        <NicknameCreateModalForm onClickCloseButton={handleModalClose} />
      )}
    </StyledRollingpaperListContainer>
  );
};

const StyledDimmer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(calc(-5%), calc(-5%));

  width: 110%;
  height: 110%;

  background-color: ${({ theme }) => `${theme.colors.GRAY_200}29`};
  filter: blur(10px);
  backdrop-filter: blur(8px);
`;

const StyledTeamJoinModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  word-break: keep-all;
  flex-direction: column;
  justify-content: space-between;

  width: 240px;
  height: 150px;
  padding: 20px 16px;

  text-align: center;

  box-shadow: 0px 4px 4px 2px rgba(147, 147, 147, 0.25);
  border-radius: 8px;

  background-color: ${({ theme }) => theme.colors.WHITE};

  @media only screen and (min-width: 960px) {
    width: 50%;
    height: 50%;
  }

  p {
    margin: auto;
    font-size: 18px;
  }
`;

const StyledRollingpaperListContainer = styled.div`
  position: relative;
  width: 80%;
`;

const StyledRollingpaperListHead = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  padding: 16px 0;

  h4 {
    font-size: 20px;
    font-weight: bold;
  }
`;

const StyledRollingpaperList = styled.ul`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export default TeamJoinSection;
