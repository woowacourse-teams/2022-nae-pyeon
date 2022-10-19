import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const Loading = () => {
  return (
    <StyledLoading>
      <div></div>
      <div></div>
      <div></div>
    </StyledLoading>
  );
};

const dot1 = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;

const dot2 = keyframes`
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(26px, 0);
  }
`;

const dot3 = keyframes`
   0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`;

const StyledLoading = styled.div`
  display: inline-block;
  position: relative;
  width: 100px;
  height: 100px;

  div {
    position: absolute;
    top: 33px;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.SKY_BLUE_200};
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }

  div:nth-child(1) {
    left: 8px;
    animation: ${dot1} 0.6s infinite;
  }
  div:nth-child(2) {
    left: 8px;
    animation: ${dot2} 0.6s infinite;
  }
  div:nth-child(3) {
    left: 34px;
    animation: ${dot2} 0.6s infinite;
  }
  div:nth-child(4) {
    left: 58px;
    animation: ${dot3} 0.6s infinite;
  }
`;
export default Loading;
