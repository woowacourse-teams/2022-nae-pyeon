import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import styled from "@emotion/styled";

import MyTeamCard from "@/pages/MainPage/components/MyTeamCard";
import TeamCreateButton from "@/pages/MainPage/components/TeamCreateButton";

import { appClient } from "@/api";
import { CustomError } from "@/types";
import useIntersect from "@/hooks/useIntersect";

const TEAM_PAGING_COUNT = 10;

interface Team {
  id: number;
  name: string;
  description: string;
  emoji: string;
  color: string;
}

const MainPage = () => {
  const ref = useIntersect(
    async (entry, observer) => {
      observer.unobserve(entry.target);
      if (hasNextPage && !isFetching) {
        fetchNextPage();
      }
    },
    { rootMargin: "10px", threshold: 1.0 }
  );

  const fetchMyTeams = async ({ pageParam = 1 }) => {
    const data = appClient
      .get(`teams/me?page=${pageParam}&count=${TEAM_PAGING_COUNT}`)
      .then((response) => response.data);
    return data;
  };

  const {
    data: myTeamListResponse,
    error: getMyTeamListError,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isError,
    isLoading,
  } = useInfiniteQuery(["projects"], fetchMyTeams, {
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage * TEAM_PAGING_COUNT < lastPage.totalCount) {
        return lastPage.currentPage + 1;
      }
    },
  });

  if (isLoading) {
    return <div>로딩 중</div>;
  }

  if (isError) {
    if (axios.isAxiosError(getMyTeamListError) && getMyTeamListError.response) {
      const customError = getMyTeamListError.response.data as CustomError;
      return <div>{customError.message}</div>;
    }
    return <div>에러</div>;
  }

  if (!myTeamListResponse) {
    return <div>에러</div>;
  }

  return (
    <StyleMain>
      <StyledCardList>
        {myTeamListResponse.pages.map((page) =>
          page.teams.map(({ id, name, description, emoji, color }: Team) => (
            <MyTeamCard
              key={id}
              id={id}
              name={name}
              description={description}
              emoji={emoji}
              color={color}
            />
          ))
        )}
        <div ref={ref} />
      </StyledCardList>
      <TeamCreateButton />
    </StyleMain>
  );
};

const StyleMain = styled.div`
  button {
    position: sticky;
    bottom: 30px;
    left: 90%;
  }
`;

const StyledCardList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-row-gap: 24px;
  grid-column-gap: 10px;
  justify-items: center;
  align-items: stretch;

  min-height: calc(100vh - 150px);

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

export default MainPage;
