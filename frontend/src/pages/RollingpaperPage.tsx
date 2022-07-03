import React from "react";
import styled from "@emotion/styled";

import Header from "@/components/Header";
import IconButton from "@/components/IconButton";
import PageTitle from "@/components/PageTitle";
import LetterPaper from "@/components/LetterPaper";

import { BiChevronLeft } from "react-icons/bi";

const StyledPageContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
`;

const StyledMain = styled.main`
  padding: 10px 25px;
`;

const dummyMessageList = [
  {
    content:
      "소피아 생일 축하해 아아아아아아아아소피아 생일 축하해 아아아아아아아아소피아 생일 축하해 아아아아아아아아소피아 생일 축하해 아아아아아아아아소피아 생일 축하해 아아아아아아아아소피아 생일 축하해 아아아아아아아아소피아 생일 축하해 아아아아아아아아소피아 생일 축하해 아아아아아아아아소피아 생일 축하해 아아아아아아아아",
    from: "도리",
    authorId: 123,
  },
  {
    content:
      "소피아 생일 축하해 아아아아아아아아소피아 생일 축하해 아아아아아아아아소피아 생일 축하해 아아아아아아아아소피아 생일 축하해 아아아아아아아아소피아 생일 축하해 아아아아아아아아소피아 생일 축하해 아아아아아아아아소피아 생일 축하해 아아아아아아아아소피아 생일 축하해 아아아아아아아아소피아 생일 축하해 아아아아아아아아",
    from: "도리",
    authorId: 123,
  },
  {
    content: "소피아 생일 축하해 아아아아아아아아",
    from: "도리",
    authorId: 123,
  },
  {
    content: "소피아 생일 축하해 아아아아아아아아",
    from: "도리",
    authorId: 123,
  },
  {
    content: "소피아 생일 축하해 아아아아아아아아",
    from: "도리",
    authorId: 123,
  },
  {
    content: "소피아 생일 축하해 아아아아아아아아",
    from: "도리",
    authorId: 123,
  },
  {
    content: "소피아 생일 축하해 아아아아아아아아",
    from: "도리",
    authorId: 123,
  },
  {
    content: "소피아 생일 축하해 아아아아아아아아",
    from: "도리",
    authorId: 123,
  },
  {
    content: "소피아 생일 축하해 아아아아아아아아",
    from: "도리",
    authorId: 123,
  },
  {
    content: "소피아 생일 축하해 아아아아아아아아",
    from: "도리",
    authorId: 123,
  },
  {
    content: "소피아 생일 축하해 아아아아아아아아",
    from: "도리",
    authorId: 123,
  },
];

const RollingpaperPage = () => {
  return (
    <StyledPageContainer>
      <Header>
        <IconButton>
          <BiChevronLeft />
        </IconButton>
        <PageTitle>소피아 생일 축하해~</PageTitle>
      </Header>
      <StyledMain>
        <LetterPaper to="소피아" messageList={dummyMessageList} />
      </StyledMain>
    </StyledPageContainer>
  );
};

export default RollingpaperPage;
