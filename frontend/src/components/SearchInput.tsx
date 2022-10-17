import React from "react";
import styled from "@emotion/styled";

import SearchIcon from "@/assets/icons/bx-search.svg";

interface SearchInputProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const SearchInput = ({ onClick, onChange }: SearchInputProps) => {
  return (
    <StyledSearch>
      <StyledInput onChange={onChange} />
      <button type="submit" onClick={onClick}>
        <SearchIcon />
      </button>
    </StyledSearch>
  );
};

const StyledSearch = styled.form`
  display: flex;
  align-items: center;

  height: 50px;

  border: 3px solid ${({ theme }) => theme.colors.SKY_BLUE_300};
  border-radius: 4px;

  button {
    position: relative;
    right: -1px;

    display: flex;
    align-items: center;

    width: 48px;
    height: 48px;

    background-color: ${({ theme }) => theme.colors.SKY_BLUE_300};
  }

  svg {
    padding: 4px;
    margin: auto;

    fill: ${({ theme }) => theme.colors.WHITE};

    font-size: 40px;
  }
`;

const StyledInput = styled.input`
  height: 100%;
  width: 100%;

  padding: 0 10px;

  border: none;
  font-size: 16px;

  &:focus {
    outline: none;
  }
`;

export default SearchInput;
