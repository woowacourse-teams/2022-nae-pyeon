import React, { PropsWithChildren } from "react";
import styled from "@emotion/styled";

interface SearchResultProp {
  onClick: () => void;
}

const SearchResultItem = ({
  children,
  onClick,
}: PropsWithChildren<SearchResultProp>) => {
  return <StyledItem onClick={onClick}>{children}</StyledItem>;
};

const StyledItem = styled.li`
  display: flex;
  align-items: center;

  padding: 20px;
  height: 70px;

  border-radius: 8px;

  font-size: 20px;
  font-weight: 600;

  background-color: ${({ theme }) => theme.colors.WHITE};
  box-shadow: 0px 4px 4px 4px ${({ theme }) => theme.colors.GRAY_200};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.SKY_BLUE_100};
  }
`;

export default SearchResultItem;
