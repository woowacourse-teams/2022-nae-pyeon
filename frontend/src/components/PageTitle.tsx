import React from "react";
import styled from "@emotion/styled";

interface PageTitleProps {
  children: string;
}

const StyledPageTitle = styled.h1`
  display: inline-block;
  font-size: 32px;
  font-weight: 600;
`;

const PageTitle = ({ children }: PageTitleProps) => {
  return <StyledPageTitle>{children}</StyledPageTitle>;
};

export default PageTitle;
