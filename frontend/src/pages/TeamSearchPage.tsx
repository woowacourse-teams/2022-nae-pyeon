import React, { useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useInfiniteQuery } from "react-query";
import axios from "axios";

import SearchInput from "@/components/SearchInput";
import TeamCard from "@/components/TeamCard";

import appClient from "@/api";
import { CustomError } from "@/types";
import useIntersect from "@/hooks/useIntersect";

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

  const fetchTeams = ({ pageParam = 1 }) => {
    const data = appClient
      .get(`teams?keyword=''&page=${pageParam}&count=5`)
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
  } = useInfiniteQuery(["projects"], fetchTeams, {
    getNextPageParam: (lastPage) => {
      let endPage = lastPage.totalCount / 5;
      if (lastPage.totalCount % 5 !== 0) {
        endPage += 1;
      }

      if (lastPage.currentPage < endPage) {
        return lastPage.currentPage + 1;
      }
    },
  });

  const handleSearchClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    // 키워드로 api call 하기
    e.preventDefault();
    console.log(searchKeyword);
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
        {totalTeamResponse.pages.map((group, i) =>
          group.teams.map((team: Team) => (
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
