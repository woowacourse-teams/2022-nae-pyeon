import styled from "@emotion/styled";

import RoundButton from "@/components/RoundButton";

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
      <RoundButton>{icon}</RoundButton>
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

  @media only screen and (min-width: 960px) {
    flex-direction: row;
    gap: 12px;
  }
`;

const StyledDescription = styled.div`
  text-align: center;
  width: 70px;

  white-space: pre-wrap;

  cursor: pointer;

  @media only screen and (min-width: 960px) {
    white-space: normal;
    width: 135px;
    text-align: left;
  }
`;

export default NavigationButton;
