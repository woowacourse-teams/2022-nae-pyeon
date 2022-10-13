import styled from "@emotion/styled";

interface NavigationButtonProps {
  icon: string;
  description: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const NavigationButton = ({
  icon,
  description,
  onClick,
}: NavigationButtonProps) => {
  return (
    <StyledNavigationButton onClick={onClick}>
      <StyledRoundButton>{icon}</StyledRoundButton>
      <StyledDescription>{description}</StyledDescription>
    </StyledNavigationButton>
  );
};

const StyledNavigationButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 8px;

  font-weight: 600;

  cursor: pointer;

  @media only screen and (min-width: 960px) {
    flex-direction: row;
    gap: 12px;
  }

  &:hover {
    button {
      background-color: ${({ theme }) => theme.colors.SKY_BLUE_300};
    }
  }
`;

const StyledRoundButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 56px;
  height: 56px;
  background-color: ${({ theme }) => theme.colors.SKY_BLUE_200};
  border-radius: 50%;

  font-size: 28px;
`;

const StyledDescription = styled.div`
  text-align: center;
  width: 70px;

  white-space: pre-wrap;

  @media only screen and (min-width: 960px) {
    white-space: normal;
    width: 135px;
    text-align: left;
  }
`;

export default NavigationButton;
