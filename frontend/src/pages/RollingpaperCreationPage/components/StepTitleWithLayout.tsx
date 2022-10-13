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

  width: calc(100vw - 80px);

  @media only screen and (min-width: 600px) {
    width: calc(500px - 108px);
  }

  @media only screen and (min-width: 960px) {
    width: calc(760px - 108px);
  }

  @media only screen and (min-width: 1280px) {
    width: calc(1020px - 108px);
  }
`;

const StyledTitle = styled.h2`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0 30px 0;

  padding: 0 32px;

  font-size: 24px;
  font-weight: 600;

  width: calc(100vw - 80px);
  word-break: break-all;

  @media only screen and (min-width: 600px) {
    width: calc(500px - 108px);
  }

  @media only screen and (min-width: 960px) {
    width: calc(760px - 108px);
  }

  @media only screen and (min-width: 1280px) {
    width: calc(1020px - 108px);
  }
`;

const StyledLayout = styled.div`
  display: flex;
  height: 65vh;

  @media only screen and (min-width: 600px) {
    height: 70vh;
  }

  justify-content: center;
  padding: 10px;

  overflow: scroll;

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

export default forwardRef(StepTitleWithLayout);
