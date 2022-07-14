import React from "react";
import styled from "@emotion/styled";

interface HeaderProps {
  children: React.ReactNode;
  align?: "center" | "left" | "right";
}

interface StyledHeaderProps {
  align: "center" | "left" | "right";
}

const alignByJustifyContent = {
  center: "center",
  left: "flex-start",
  right: "flex-end",
};

const Header = ({ children, align = "left" }: HeaderProps) => {
  return <StyledHeader align={align}>{children}</StyledHeader>;
};

const StyledHeader = styled.header<StyledHeaderProps>`
  display: flex;
  align-items: center;

  width: 100%;
  padding: 20px 0;
  margin-bottom: 10px;
  gap: 10px;

  justify-content: ${({ align }) => alignByJustifyContent[align]};
`;

export default Header;
