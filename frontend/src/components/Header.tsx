import React from "react";
import styled from "@emotion/styled";

interface HeaderProps {
  children: React.ReactNode;
}

const StyledHeader = styled.header`
  display: flex;
  align-items: center;

  width: 100%;
  padding: 20px 10px;
  gap: 10px;
`;

const Header = ({ children }: HeaderProps) => {
  return <StyledHeader>{children}</StyledHeader>;
};

export default Header;
