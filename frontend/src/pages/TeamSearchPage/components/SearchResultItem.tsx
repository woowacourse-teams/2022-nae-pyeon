import React, { PropsWithChildren } from "react";
import styled from "@emotion/styled";

import LockIcon from "@/assets/icons/bx-lock-alt.svg";

interface SearchResultProp {
  onClick: () => void;
  secret: boolean;
}

const SearchResultItem = ({
  children,
  onClick,
  secret,
}: PropsWithChildren<SearchResultProp>) => {
  return (
    <StyledItem onClick={onClick}>
      {secret && (
        <StyledSecret>
          <LockIcon /> 비밀 모임
        </StyledSecret>
      )}
      {children}
    </StyledItem>
  );
};

const StyledItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;

  gap: 4px;

  padding: 20px;
  height: 80px;

  border-radius: 8px;
  border: 2px solid ${({ theme }) => theme.colors.SKY_BLUE_300};

  font-size: 20px;
  font-weight: 600;

  background-color: ${({ theme }) => theme.colors.WHITE};

  &:hover {
    border: 2px solid ${({ theme }) => theme.colors.SKY_BLUE_400};
  }
`;

const StyledSecret = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;

  color: ${({ theme }) => theme.colors.GRAY_600};
  font-size: 14px;

  svg {
    fill: ${({ theme }) => theme.colors.GRAY_600};
  }
`;

export default SearchResultItem;
