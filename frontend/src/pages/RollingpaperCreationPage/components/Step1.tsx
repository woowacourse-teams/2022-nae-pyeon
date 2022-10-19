import React, { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

import useIntersect from "@/hooks/useIntersect";
import useReadMyTeam from "@/pages/RollingpaperCreationPage/hooks/useReadMyTeam";

import MyTeamCard from "@/components/MyTeamCard";
import Loading from "@/components/Loading";
import StepTitleWithLayout from "@/pages/RollingpaperCreationPage/components/StepTitleWithLayout";

import { Team } from "@/types";

interface Step1Props {
  onClick: (id: Team["id"]) => void;
  selected: Team["id"] | null;
}

const Step1 = (
  { onClick, selected }: Step1Props,
  ref: React.Ref<HTMLDivElement>
) => {
  const infiniteRef = useIntersect({
    onIntersect: async (entry, observer) => {
      observer.unobserve(entry.target);
      if (hasNextPage && !isFetching) {
        fetchNextPage();
      }
    },
    options: { rootMargin: "10px", threshold: 1.0 },
  });

  const {
    data: myTeamListResponse,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
  } = useReadMyTeam();
  const navigate = useNavigate();

  if (isLoading) {
    return <Loading />;
  }

  if (!myTeamListResponse) {
    navigate("/");

    // JSX를 리턴하지 않으면 오류가 나고 있어서 차후에 수정
    return <div></div>;
  }

  return (
    <StepTitleWithLayout title="모임을 선택해주세요" ref={ref}>
      <StyledCardList>
        {myTeamListResponse.pages.map((page) =>
          page.teams.map(({ id, name, description, emoji, color }) => (
            <MyTeamCard
              key={id}
              id={id}
              name={name}
              description={description}
              emoji={emoji}
              color={color}
              onClick={() => onClick(id)}
              selected={id === selected}
            />
          ))
        )}
        <div ref={infiniteRef} />
      </StyledCardList>
    </StepTitleWithLayout>
  );
};

const StyledCardList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-row-gap: 24px;
  grid-column-gap: 10px;
  justify-items: center;
  align-items: center;

  @media only screen and (min-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media only screen and (min-width: 1280px) {
    grid-template-columns: repeat(3, 1fr);
  }

  a {
    height: fit-content;
  }
`;

export default forwardRef(Step1);
