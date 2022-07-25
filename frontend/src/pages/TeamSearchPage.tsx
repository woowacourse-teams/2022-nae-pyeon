import React, { useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";

import SearchInput from "@/components/SearchInput";
import TeamCard from "@/components/TeamCard";

import appClient from "@/api";
import { CustomError } from "@/types";

interface TotalTeamListResponse {
  teams: Team[];
}
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

  const {
    isLoading,
    isError,
    error: getTotalTeamsError,
    data: totalTeamResponse,
  } = useQuery<TotalTeamListResponse>(["total-teams"], () =>
    appClient.get(`/teams`).then((response) => response.data)
  );

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
        {totalTeamResponse.teams.map((team) => (
          <TeamCard
            key={team.id}
            onClick={() => {
              handleTeamCardClick(team.id);
            }}
          >
            {team.name}
          </TeamCard>
        ))}
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
