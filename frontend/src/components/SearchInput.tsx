import React from "react";
import styled from "@emotion/styled";

import { BiSearch } from "react-icons/bi";

type ButtonAttributes = React.ButtonHTMLAttributes<HTMLButtonElement>;
type InputAttributes = React.InputHTMLAttributes<HTMLInputElement>;

const SearchInput = ({
  onClick,
  onChange,
}: ButtonAttributes & InputAttributes) => {
  return (
    <StyledSearch>
      <StyledInput onChange={onChange} />
      <button type="submit" onClick={onClick}>
        <BiSearch />
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
    display: flex;
    align-items: center;

    height: 100%;

    background-color: ${({ theme }) => theme.colors.SKY_BLUE_300};
  }

  svg {
    padding: 4px;

    color: ${({ theme }) => theme.colors.WHITE};

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
