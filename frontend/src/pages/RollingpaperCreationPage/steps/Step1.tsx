import React, { forwardRef } from "react";
import styled from "@emotion/styled";

import useReadMyTeam from "@/pages/RollingpaperCreationPage/hooks/useReadMyTeam";

import StepTitleWithLayout from "@/pages/RollingpaperCreationPage/components/StepTitleWithLayout";
import MyTeamCard from "@/pages/RollingpaperCreationPage/components/MyTeamCard";

import { Team } from "@/types";
import useIntersect from "@/hooks/useIntersect";

interface Step1Props {
  onClick: (id: Team["id"]) => void;
}

const Step1 = ({ onClick }: Step1Props, ref: React.Ref<HTMLDivElement>) => {
  const infiniteRef = useIntersect(
    async (entry, observer) => {
      observer.unobserve(entry.target);
      if (hasNextPage && !isFetching) {
        fetchNextPage();
      }
    },
    { rootMargin: "10px", threshold: 1.0 }
  );

  const {
    data: myTeamListResponse,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
  } = useReadMyTeam();

  if (!myTeamListResponse) {
    return <div>내 팀 없음ㅠ</div>;
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
  align-items: stretch;

  @media only screen and (min-width: 960px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media only screen and (min-width: 1280px) {
    grid-template-columns: repeat(4, 1fr);
  }

  a {
    height: fit-content;
  }
`;

export default forwardRef(Step1);
