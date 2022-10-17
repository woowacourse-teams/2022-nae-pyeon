import React from "react";
import styled from "@emotion/styled";

import LockIcon from "@/assets/icons/bx-lock-alt.svg";

interface SearchResultProps {
  onClick: () => void;
  secret: boolean;
  name: string;
}

const SearchResultItem = ({ onClick, secret, name }: SearchResultProps) => {
  return (
    <StyledItem onClick={onClick}>
      {secret && (
        <StyledSecret>
          <LockIcon /> 비공개 모임
        </StyledSecret>
      )}
      {name}
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
