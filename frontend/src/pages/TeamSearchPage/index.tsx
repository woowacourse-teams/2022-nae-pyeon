import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import styled from "@emotion/styled";

import useIntersect from "@/hooks/useIntersect";

import SearchInput from "@/components/SearchInput";
import Loading from "@/components/Loading";
import SearchResultListItem from "@/pages/TeamSearchPage/components/SearchResultListItem";

import { getTeamSearchResult } from "@/api/team";
import { TOTAL_TEAMS_PAGING_COUNT } from "@/constants";

import { Team } from "@/types";

import EmptyStateImg from "@/assets/images/empty-state.svg";
import PageTitle from "@/components/PageTitle";

const TeamSearchPage = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();
  const ref = useIntersect({
    onIntersect: async (entry, observer) => {
      observer.unobserve(entry.target);
      if (hasNextPage && !isFetching) {
        fetchNextPage();
      }
    },
    options: { rootMargin: "10px", threshold: 1.0 },
  });

  const {
    data: totalTeamResponse,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    refetch,
  } = useInfiniteQuery(
    ["team-search"],
    getTeamSearchResult({
      keyword: searchKeyword,
      count: TOTAL_TEAMS_PAGING_COUNT,
    }),
    {
      getNextPageParam: (lastPage) => {
        if (
          lastPage.currentPage * TOTAL_TEAMS_PAGING_COUNT <
          lastPage.totalCount
        ) {
          return lastPage.currentPage + 1;
        }
      },
    }
  );

  const handleSearchClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    refetch();
  };

  const handleSearchChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setSearchKeyword(e.target.value);
  };

  const handleSearchResultItemClick = (id: number) => {
    navigate(`/team/${id}`);
  };

  if (isLoading || !totalTeamResponse) {
    return <Loading />;
  }

  return (
    <>
      <PageTitle title="모임 검색하기" />
      <StyledSearch>
        <SearchInput
          onClick={handleSearchClick}
          onChange={handleSearchChange}
        />
      </StyledSearch>
      {totalTeamResponse.pages[0]?.teams.length === 0 ? (
        <StyledEmptySearch>
          <EmptyStateImg />
          <div>검색 결과가 없어요!</div>
        </StyledEmptySearch>
      ) : (
        <StyledTeamList>
          {totalTeamResponse.pages.map((page) =>
            page.teams.map((team: Team) => (
              <SearchResultListItem
                key={team.id}
                onClick={() => {
                  handleSearchResultItemClick(team.id);
                }}
                secret={team.secret}
                name={team.name}
              />
            ))
          )}
          <div ref={ref} />
        </StyledTeamList>
      )}
    </>
  );
};

const StyledEmptySearch = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin-top: 10px;
  height: 75vh;

  svg {
    font-size: 200px;
  }

  div {
    font-size: 24px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.GRAY_400};

    margin-bottom: 20px;
  }
`;

const StyledSearch = styled.div`
  padding: 20px 0;
`;

const StyledTeamList = styled.ul`
  display: flex;
  flex-direction: column;

  height: 75vh;
  padding: 20px;
  padding-left: 0;

  gap: 16px;

  overflow-y: scroll;
`;

export default TeamSearchPage;
