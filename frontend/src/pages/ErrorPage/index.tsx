import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

import LineButton from "@/components/LineButton";

import ErrorImg from "@/assets/images/empty-state.svg";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <StyledContainer>
      <ErrorImg />
      <StyledMessage>에러가 발생했어요.</StyledMessage>
      <StyledButtonContainer>
        <LineButton
          onClick={() => {
            navigate("/", { replace: true });
          }}
        >
          홈으로 돌아가기
        </LineButton>
        {
          <LineButton
            onClick={() => {
              window.location.reload();
            }}
          >
            새로고침
          </LineButton>
        }
      </StyledButtonContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 80vh;

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

const StyledButtonContainer = styled.div`
  display: flex;
  gap: 32px;
`;

export default ErrorPage;
