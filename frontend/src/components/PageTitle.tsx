import React from "react";
import styled from "@emotion/styled";

interface PageTitleProps {
  children: string;
}

const PageTitle = ({ children }: PageTitleProps) => {
  return <StyledPageTitle>{children}</StyledPageTitle>;
};

const StyledPageTitle = styled.h1`
  display: inline-block;
  font-size: 32px;
  font-weight: 600;

  padding: 6px 0 0;
`;

export default PageTitle;
