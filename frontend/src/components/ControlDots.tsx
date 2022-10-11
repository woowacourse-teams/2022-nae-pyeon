import styled from "@emotion/styled";

interface ControlDotsProps {
  pages: number;
  step: number;
}

interface StyledDotProps {
  now: boolean;
}

const ControlDots = ({ pages, step }: ControlDotsProps) => {
  return (
    <StyledControlDots>
      {Array.from({ length: pages }).map((value, index) => {
        return <StyledDot key={index} now={index === step} />;
      })}
    </StyledControlDots>
  );
};

const StyledControlDots = styled.div`
  display: flex;

  justify-content: center;

  padding: 10px 0 20px 0;
  gap: 6px;
`;

const StyledDot = styled.div<StyledDotProps>`
  width: 10px;
  height: 10px;
  border-radius: 50%;

  background-color: ${({ now, theme }) =>
    now ? theme.colors.SKY_BLUE_300 : theme.colors.GRAY_200};
`;

export default ControlDots;
