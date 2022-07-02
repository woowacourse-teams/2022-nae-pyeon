import React from "react";
import styled from "@emotion/styled";

interface HeaderProps {
  children: string;
}

const StyledHeader = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  padding: 10px;
  gap: 10px;
`;

const Header = ({ children }: HeaderProps) => {
  return <StyledHeader>{children}</StyledHeader>;
};

export default Header;
