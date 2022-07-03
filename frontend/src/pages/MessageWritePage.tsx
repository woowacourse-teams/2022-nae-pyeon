import React from "react";
import styled from "@emotion/styled";

import Header from "@/components/Header";
import Button from "@/components/Button";
import IconButton from "@/components/IconButton";
import TextArea from "@/components/TextArea";

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

const StyledDoneButtonWrapper = styled.div`
  margin: 0 0 0 auto;
`;

const MessageWritePage = () => {
  return (
    <StyledPageContainer>
      <Header>
        <IconButton>
          <BiChevronLeft />
        </IconButton>
        <StyledDoneButtonWrapper>
          <Button>완료</Button>
        </StyledDoneButtonWrapper>
      </Header>
      <StyledMain>
        <TextArea />
      </StyledMain>
    </StyledPageContainer>
  );
};

export default MessageWritePage;
