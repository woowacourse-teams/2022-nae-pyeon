import React, { forwardRef, LegacyRef, PropsWithChildren } from "react";
import styled from "@emotion/styled";

interface StepTitleWithLayoutProps extends PropsWithChildren {
  title: string;
}

const StepTitleWithLayout = (
  { title, children }: StepTitleWithLayoutProps,
  ref: LegacyRef<HTMLDivElement>
) => {
  return (
    <StyledTitleWithLayout ref={ref}>
      <StyledTitle>{title}</StyledTitle>
      <StyledLayout>{children}</StyledLayout>
    </StyledTitleWithLayout>
  );
};

const StyledTitleWithLayout = styled.div`
  display: flex;
  flex-direction: column;

  width: calc(100vw - 48px);

  @media only screen and (min-width: 600px) {
    width: calc(500px - 48px);
  }

  @media only screen and (min-width: 960px) {
    width: calc(760px - 48px);
  }

  @media only screen and (min-width: 1280px) {
    width: calc(1020px - 48px);
  }
`;

const StyledTitle = styled.h2`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0 30px 0;

  font-size: 24px;
  font-weight: 600;

  width: calc(100vw - 48px);

  @media only screen and (min-width: 600px) {
    width: calc(500px - 48px);
  }

  @media only screen and (min-width: 960px) {
    width: calc(760px - 48px);
  }

  @media only screen and (min-width: 1280px) {
    width: calc(1020px - 48px);
  }
`;

const StyledLayout = styled.div`
  display: flex;
  height: 70vh;

  justify-content: center;
  padding: 10px;

  overflow: scroll;
`;

export default forwardRef(StepTitleWithLayout);