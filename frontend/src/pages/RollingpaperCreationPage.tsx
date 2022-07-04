import React from "react";
import styled from "@emotion/styled";
import Header from "@/components/Header";
import IconButton from "@/components/IconButton";
import PageTitle from "@/components/PageTitle";
import LabeledInput from "@/components/LabeledInput";
import SearchInput from "@/components/SearchInput";
import Button from "@/components/Button";

import { BiChevronLeft } from "react-icons/bi";

const StyledPageContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
`;

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;

  padding: 48px 25px;

  button {
    align-self: flex-end;
  }
`;

const RollingpaperCreationPage = () => {
  return (
    <StyledPageContainer>
      <Header>
        <IconButton>
          <BiChevronLeft />
        </IconButton>
        <PageTitle>롤링페이퍼 만들기</PageTitle>
      </Header>
      <StyledMain>
        <LabeledInput labelText="롤링페이퍼 이름" />
        <SearchInput
          labelText="롤링페이퍼 대상"
          searchKeywordList={["A", "B", "C", "D", "AA", "AB"]}
        />
        <Button>완료</Button>
      </StyledMain>
    </StyledPageContainer>
  );
};

export default RollingpaperCreationPage;
