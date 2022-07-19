import React from "react";
import styled from "@emotion/styled";
import { useQuery } from "react-query";

import MyTeamCard from "@/components/MyTeamCard";
import TeamCreateButton from "@/components/TeamCreateButton";
import RequireLogin from "@/components/RequireLogin";

import appClient from "@/api";

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
    data: myTeamListResponse,
  } = useQuery<MyTeamListResponse>(["my-teams"], () =>
    appClient.get(`/teams/me`).then((response) => response.data)
  );

  if (isLoading) {
    return <div>로딩 중</div>;
  }
  if (isError || !myTeamListResponse) {
    return <div>에러</div>;
  }

  return (
    <RequireLogin>
      <StyleMain>
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
      </StyleMain>
    </RequireLogin>
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

  @media only screen and (min-width: 960px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media only screen and (min-width: 1280px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export default MainPage;
