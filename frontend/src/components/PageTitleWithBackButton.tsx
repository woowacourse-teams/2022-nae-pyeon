import React, { PropsWithChildren } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

import { BiChevronLeft } from "react-icons/bi";

import IconButton from "@components/IconButton";

const PageTitleWithBackButton = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  return (
    <StyledPageTitleContainer>
      <IconButton onClick={handleBackButtonClick}>
        <BiChevronLeft />
      </IconButton>
      <h1>{children}</h1>
    </StyledPageTitleContainer>
  );
};

const StyledPageTitleContainer = styled.div`
  display: flex;

  width: 100%;
  padding: 20px 0;
  margin-bottom: 10px;
  gap: 10px;

  h1 {
    font-size: 32px;
    padding-top: 6px;
  }
`;

export default PageTitleWithBackButton;
