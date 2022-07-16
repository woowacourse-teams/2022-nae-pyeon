import React from "react";
import styled from "@emotion/styled";

import MainCard from "@/components/MainCard";
import PlusButton from "@/components/PlusButton";

const teamList = [
  {
    id: 1,
    name: "우테코 4기",
    description: "우테코 4기 설명입니다",
    emoji: "😎",
    color: "#FF8181",
  },
  {
    id: 2,
    name: "우테코 4기",
    description: "우테코 4기 설명입니다",
    emoji: "😎",
    color: "#C5FF98",
  },
  {
    id: 3,
    name: "우테코 4기",
    description: "우테코 4기 설명입니다",
    emoji: "😎",
    color: "#FFF598",
  },
  {
    id: 4,
    name: "우테코 4기",
    description: "우테코 4기 설명입니다",
    emoji: "😎",
    color: "#98DAFF",
  },
  {
    id: 5,
    name: "우테코 4기",
    description: "우테코 4기 설명입니다",
    emoji: "😎",
    color: "#FF8181",
  },
  {
    id: 6,
    name: "우테코 4기",
    description: "우테코 4기 설명입니다",
    emoji: "😎",
    color: "#C5FF98",
  },
  {
    id: 7,
    name: "우테코 4기",
    description: "우테코 4기 설명입니다",
    emoji: "😎",
    color: "#FFF598",
  },
  {
    id: 8,
    name: "우테코 4기",
    description: "우테코 4기 설명입니다",
    emoji: "😎",
    color: "#98DAFF",
  },
  {
    id: 9,
    name: "우테코 4기",
    description: "우테코 4기 설명입니다",
    emoji: "😎",
    color: "#FF8181",
  },
  {
    id: 10,
    name: "우테코 4기",
    description: "우테코 4기 설명입니다",
    emoji: "😎",
    color: "#C5FF98",
  },
  {
    id: 11,
    name: "우테코 4기",
    description: "우테코 4기 설명입니다",
    emoji: "😎",
    color: "#FFF598",
  },
  {
    id: 12,
    name: "우테코 4기",
    description: "우테코 4기 설명입니다",
    emoji: "😎",
    color: "#98DAFF",
  },
  {
    id: 13,
    name: "우테코 4기",
    description: "우테코 4기 설명입니다",
    emoji: "😎",
    color: "#FF8181",
  },
  {
    id: 14,
    name: "우테코 4기",
    description: "우테코 4기 설명입니다",
    emoji: "😎",
    color: "#C5FF98",
  },
  {
    id: 15,
    name: "우테코 4기",
    description: "우테코 4기 설명입니다",
    emoji: "😎",
    color: "#FFF598",
  },
  {
    id: 16,
    name: "우테코 4기",
    description: "우테코 4기 설명입니다",
    emoji: "😎",
    color: "#98DAFF",
  },
];

const MainPage = () => {
  return (
    <StyleMain>
      <StyledCardList>
        {teamList.map(({ id, name, description, emoji, color }) => (
          <MainCard
            key={id}
            name={name}
            description={description}
            emoji={emoji}
            color={color}
          />
        ))}
      </StyledCardList>
      <PlusButton />
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

  @media only screen and (min-width: 960px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media only screen and (min-width: 1280px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export default MainPage;
