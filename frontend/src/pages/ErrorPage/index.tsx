import React from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

import LineButton from "@/components/LineButton";

import ErrorImg from "@/assets/images/empty-state.svg";

interface ErrorPageProps {
  onReset?: () => void;
}

const ErrorPage = ({ onReset }: ErrorPageProps) => {
  const navigate = useNavigate();

  return (
    <StyledContainer>
      <ErrorImg />
      <StyledMessage>에러가 발생했어요.</StyledMessage>
      <LineButton
        onClick={() => {
          onReset && onReset();
          navigate("/", { replace: true });
        }}
      >
        홈으로 돌아가기
      </LineButton>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 100px;

  svg {
    font-size: 150px;
  }
`;

const StyledMessage = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.GRAY_400};

  margin-bottom: 60px;
`;

export default ErrorPage;
