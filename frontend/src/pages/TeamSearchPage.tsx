import React, { useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useInfiniteQuery } from "react-query";
import axios from "axios";

import useIntersect from "@/hooks/useIntersect";

import SearchInput from "@/components/SearchInput";
import TeamCard from "@/components/TeamCard";

import appClient from "@/api";
import { CustomError } from "@/types";
import { TOTAL_TEAMS_PAGING_COUNT } from "@/constants";

interface Team {
  id: number;
  name: string;
  description: string;
  emoji: string;
  color: string;
}

const TeamSearch = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();
  const ref = useIntersect(
    async (entry, observer) => {
      observer.unobserve(entry.target);
      if (hasNextPage && !isFetching) {
        fetchNextPage();
      }
    },
    { rootMargin: "10px", threshold: 1.0 }
  );

  const fetchTeams =
    (keyword: string) =>
    async ({ pageParam = 1 }) => {
      const data = appClient
        .get(
          `teams?keyword=${keyword}&page=${pageParam}&count=${TOTAL_TEAMS_PAGING_COUNT}`
        )
        .then((response) => response.data);
      return data;
    };

  const {
    data: totalTeamResponse,
    error: getTotalTeamsError,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isError,
    isLoading,
    refetch,
  } = useInfiniteQuery(["projects"], fetchTeams(searchKeyword), {
    getNextPageParam: (lastPage) => {
      if (
        lastPage.currentPage * TOTAL_TEAMS_PAGING_COUNT <
        lastPage.totalCount
      ) {
        return lastPage.currentPage + 1;
      }

      return undefined;
    },
  });

  const handleSearchClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    refetch();
  };

  const handleSearchChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setSearchKeyword(e.target.value);
  };

  const handleTeamCardClick = (id: number) => {
    navigate(`/team/${id}`);
  };

  if (isLoading) {
    return <div>로딩 중</div>;
  }

  if (isError) {
    if (axios.isAxiosError(getTotalTeamsError) && getTotalTeamsError.response) {
      const customError = getTotalTeamsError.response.data as CustomError;
      return <div>{customError.message}</div>;
    }
    return <div>에러</div>;
  }

  if (!totalTeamResponse) {
    return <div>에러</div>;
  }

  return (
    <>
      <StyledSearch>
        <SearchInput
          onClick={handleSearchClick}
          onChange={handleSearchChange}
        />
      </StyledSearch>
      <StyledTeamList>
        {totalTeamResponse.pages.map((page) =>
          page.teams.map((team: Team) => (
            <TeamCard
              key={team.id}
              onClick={() => {
                handleTeamCardClick(team.id);
              }}
            >
              {team.name}
            </TeamCard>
          ))
        )}
        <div ref={ref} />
      </StyledTeamList>
    </>
  );
};

const StyledSearch = styled.div`
  padding: 20px;
`;

const StyledTeamList = styled.ul`
  display: flex;
  flex-direction: column;

  height: 75vh;
  margin-top: 10px;
  padding: 20px;

  gap: 24px;

  overflow-y: scroll;
`;

export default TeamSearch;
