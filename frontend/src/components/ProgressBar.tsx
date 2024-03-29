import styled from "@emotion/styled";

interface ProgressBarProps {
  step: number;
  total: number;
}

const ProgressBar = ({ step, total }: ProgressBarProps) => {
  return (
    <StyledProgressBarBackground>
      <StyledProgress width={(step / total) * 100} />
    </StyledProgressBarBackground>
  );
};

const StyledProgressBarBackground = styled.div`
  width: 100%;
  height: 20px;

  border-radius: 20px;

  background-color: ${({ theme }) => theme.colors.GRAY_200};
`;

const StyledProgress = styled.div<{ width: number }>`
  width: ${(props) => props.width}%;
  height: 100%;

  background-color: ${({ theme }) => theme.colors.SKY_BLUE_200};

  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;

  border-top-right-radius: ${(props) => props.width === 100 && "20px"};
  border-bottom-right-radius: ${(props) => props.width === 100 && "20px"};

  transition: 0.4s linear;
`;

export default ProgressBar;
