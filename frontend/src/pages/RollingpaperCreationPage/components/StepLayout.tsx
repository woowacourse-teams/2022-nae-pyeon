import React from "react";
import styled from "@emotion/styled";

interface StepLayoutProps extends React.PropsWithChildren {
  title?: string;
}

const StepLayout = ({ title, children }: StepLayoutProps) => {
  return (
    <StyledStepLayout>
      <StyledTitle>{title}</StyledTitle>
      <StyledLayout>{children}</StyledLayout>
    </StyledStepLayout>
  );
};

const StyledStepLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledTitle = styled.h2`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0 30px 0;

  padding: 0 32px;

  font-size: 24px;
  font-weight: 600;

  word-break: break-all;

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

export default StepLayout;
