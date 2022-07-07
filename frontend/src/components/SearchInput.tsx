import React, { useState } from "react";
import styled from "@emotion/styled";

import { BiSearch } from "react-icons/bi";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText: string;
  searchKeywordList: string[];
  setValue: (value: string) => void;
}

const SearchInput = ({
  labelText,
  value,
  setValue,
  searchKeywordList,
}: SearchInputProps) => {
  const [autocompleteList, setAutocompleteList] = useState(searchKeywordList);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);

    const newAutocompleteList = searchKeywordList.filter((keyword) =>
      keyword.includes(e.target.value)
    );
    setAutocompleteList(newAutocompleteList);
  };

  return (
    <StyledLabel>
      {labelText}
      <StyledInputContainer>
        <BiSearch />
        <input value={value} onChange={handleInputChange} />
      </StyledInputContainer>
      {autocompleteList.length > 0 && (
        <StyledAutocompleteList>
          {autocompleteList.map((autocompleteListItem) => (
            <StyledAutocompleteListItem
              key={autocompleteListItem}
              onClick={() => {
                setValue(autocompleteListItem);
              }}
            >
              {autocompleteListItem}
            </StyledAutocompleteListItem>
          ))}
        </StyledAutocompleteList>
      )}
    </StyledLabel>
  );
};

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  width: 100%;

  font-size: 12px;
  color: ${({ theme }) => theme.colors.GRAY_600};
`;

const StyledInputContainer = styled.div`
  display: flex;
  align-items: center;

  height: 48px;
  padding: 0 10px;
  margin-top: 8px;
  gap: 10px;

  background-color: ${({ theme }) => theme.colors.GRAY_100};
  border-radius: 8px;

  svg {
    font-size: 30px;
  }

  input {
    width: 100%;

    font-size: 16px;
    border: none;
    background-color: transparent;

    &:focus {
      outline: none;
    }
  }
`;

const StyledAutocompleteList = styled.ul`
  max-height: 100px;
  overflow-y: scroll;
  margin-top: 5px;
  background-color: ${({ theme }) => theme.colors.WHITE};
  color: ${({ theme }) => theme.colors.GRAY_800};
  border: 1px solid ${({ theme }) => theme.colors.GRAY_200};
  border-radius: 8px;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const StyledAutocompleteListItem = styled.li`
  height: 40px;
  padding: 10px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.GRAY_200};

  font-size: 16px;

  :last-child {
    border: none;
  }

  cursor: pointer;
`;

export default SearchInput;
