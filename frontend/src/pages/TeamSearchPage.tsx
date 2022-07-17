import React, { useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

import SearchInput from "@/components/SearchInput";
import TeamCard from "@/components/TeamCard";

const teamList = [
  { id: 1, title: "우테코 4기" },
  { id: 2, title: "우테코 4기" },
  { id: 3, title: "우테코 4기" },
  { id: 4, title: "우테코 4기" },
  { id: 5, title: "우테코 4기" },
  { id: 6, title: "우테코 4기" },
  { id: 7, title: "우테코 4기" },
  { id: 8, title: "우테코 4기" },
  { id: 9, title: "우테코 4기" },
  { id: 10, title: "우테코 4기" },
  { id: 11, title: "우테코 4기" },
  { id: 12, title: "우테코 4기" },
];

const TeamSearch = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearchClick = (e: any) => {
    // 키워드로 api call 하기
    e.preventDefault();
    console.log(searchKeyword);
  };

  const handleSearchChange = (e: any) => {
    setSearchKeyword(e.target.value);
  };

  const handleTeamCardClick = (id: number) => {
    navigate(`/team/${id}`);
  };

  return (
    <>
      <StyledSearch>
        <SearchInput
          onClick={handleSearchClick}
          onChange={handleSearchChange}
        />
      </StyledSearch>
      <StyledTeamList>
        {teamList.map((team) => (
          <TeamCard
            key={team.id}
            onClick={() => {
              handleTeamCardClick(team.id);
            }}
          >
            {team.title}
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

  height: 70vh;
  padding: 20px;

  gap: 24px;

  overflow: scroll;
`;

export default TeamSearch;
