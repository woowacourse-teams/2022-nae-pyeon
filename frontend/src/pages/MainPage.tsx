import React from "react";
import styled from "@emotion/styled";
import { useQuery } from "react-query";

import MainCard from "@/components/MainCard";
import PlusButton from "@/components/PlusButton";
import RequireLogin from "@/components/RequireLogin";

import appClient from "@/api";

interface TeamType {
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
    data: teamList,
  } = useQuery<TeamType[]>(["my-teams"], () =>
    appClient.get(`/teams/me`).then((response) => response.data)
  );

  if (isLoading) {
    return <div>로딩 중</div>;
  }
  if (isError || !teamList) {
    return <div>에러</div>;
  }

  return (
    <RequireLogin>
      <StyleMain>
        <StyledCardList>
          {teamList.map(({ id, name, description, emoji, color }) => (
            <MainCard
              key={id}
              id={id}
              name={name}
              description={description}
              emoji={emoji}
              color={color}
            />
          ))}
        </StyledCardList>
        <PlusButton />
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
