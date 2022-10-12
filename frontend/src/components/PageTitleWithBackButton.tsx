import React, { PropsWithChildren } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

import ChevronIcon from "@/assets/icons/bx-chevron-left.svg";

import IconButton from "@components/IconButton";

interface PageTitleWithBackButtonProps extends PropsWithChildren {
  to: string;
}

const PageTitleWithBackButton = ({
  to,
  children,
}: PageTitleWithBackButtonProps) => {
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate(to);
  };

  return (
    <StyledPageTitleContainer>
      <IconButton onClick={handleBackButtonClick}>
        <ChevronIcon />
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
