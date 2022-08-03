import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import styled from "@emotion/styled";

import MyTeamCard from "@/pages/MainPage/components/MyTeamCard";
import TeamCreateButton from "@/pages/MainPage/components/TeamCreateButton";
import EmptyMyTeamList from "@/pages/MainPage/components/EmptyMyTeamList";

import { appClient } from "@/api";
import { CustomError } from "@/types";

interface MyTeamListResponse {
  teams: Team[];
}

interface Team {
  id: number;
  name: string;
  description: string;
  emoji: string;
  color: string;
}

const MainPage = () => {
  const {
    isLoading,
    isError,
    error: getMyTeamListError,
    data: myTeamListResponse,
  } = useQuery<MyTeamListResponse>(["my-teams"], () =>
    appClient.get(`/teams/me`).then((response) => response.data)
  );

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

  if (myTeamListResponse.teams.length === 0) {
    return (
      <StyledEmptyMain>
        <EmptyMyTeamList />
      </StyledEmptyMain>
    );
  }

  return (
    <StyledMain>
      <StyledCardList>
        {myTeamListResponse.teams.map(
          ({ id, name, description, emoji, color }) => (
            <MyTeamCard
              key={id}
              id={id}
              name={name}
              description={description}
              emoji={emoji}
              color={color}
            />
          )
        )}
      </StyledCardList>
      <TeamCreateButton />
    </StyledMain>
  );
};

const StyledEmptyMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 12px;

  height: calc(100vh - 150px);

  button {
    width: 152px;
  }
  svg {
    font-size: 300px;
  }
`;

const StyledMain = styled.div`
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
