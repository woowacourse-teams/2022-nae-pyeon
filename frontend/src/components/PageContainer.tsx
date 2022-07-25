import React, { PropsWithChildren } from "react";
import styled from "@emotion/styled";

const PageContainer = ({ children }: PropsWithChildren) => {
  return <StyledPageContainer>{children}</StyledPageContainer>;
};

const StyledPageContainer = styled.div`
  min-height: 100vh;
  margin: 0 auto;
  padding: 0 24px;

  background-color: ${({ theme }) => theme.colors.WHITE};

  @media only screen and (min-width: 600px) {
    width: 500px;
  }

  @media only screen and (min-width: 960px) {
    width: 760px;
  }

  @media only screen and (min-width: 1280px) {
    width: 1020px;
  }
`;

export default PageContainer;
