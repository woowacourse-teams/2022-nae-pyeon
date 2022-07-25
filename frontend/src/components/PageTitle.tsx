import React from "react";
import styled from "@emotion/styled";

interface PageTitleProps {
  children: string;
}

const PageTitle = ({ children }: PageTitleProps) => {
  return <StyledPageTitle>{children}</StyledPageTitle>;
};

const StyledPageTitle = styled.h1`
  width: 100%;
  padding: 20px 0;
  margin-bottom: 10px;

  text-align: center;

  font-size: 32px;
  font-weight: 600;
`;

export default PageTitle;
