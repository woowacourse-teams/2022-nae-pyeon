import { PropsWithChildren } from "react";
import styled from "@emotion/styled";
import theme from "@/styles/theme";

interface DotBadgeProps {
  variant: "dot";
  invisible?: boolean;
  color?: string;
}

interface NumberBadgeProps {
  variant: "number";
  badgeContent: number;
  max?: number;
  color?: string;
}

type BadgeProps = DotBadgeProps | NumberBadgeProps;

const Badge = (props: PropsWithChildren<BadgeProps>) => {
  if (props.variant === "number") {
    const { children, badgeContent, max = 100, color } = props;

    return (
      <StyledContainer>
        {children}
        <StyledNumberBadge color={color}>
          <span>{badgeContent <= max ? badgeContent : `${max}+`}</span>
        </StyledNumberBadge>
      </StyledContainer>
    );
  }

  const { children, invisible = false, color } = props;

  return (
    <StyledContainer>
      {children}
      <StyledDotBadge invisible={invisible} color={color} />
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  position: relative;

  width: fit-content;
  height: fit-content;
`;

const StyledDotBadge = styled.div<{
  invisible?: boolean;
  color?: string;
}>`
  display: ${({ invisible }) => (invisible ? "none" : "block")};

  position: absolute;
  top: 0px;
  right: 0px;
  transform: translate3d(8%, -8%, 0);

  width: 10px;
  height: 10px;
  border-radius: 50%;

  background-color: ${({ color }) => color ?? theme.colors.RED_400};
`;

const StyledNumberBadge = styled.div<{
  color?: string;
}>`
  position: absolute;
  top: 0px;
  right: 0px;
  transform: translate3d(30%, -25%, 0);

  min-width: 24px;
  border-radius: 30%;
  padding: 2px 4px;

  text-align: center;
  font-size: 14px;
  font-weight: 600;

  background-color: ${({ color }) => color ?? theme.colors.RED_400};

  span {
    position: relative;
    top: 1px;
  }
`;

export default Badge;
