import React, { useState } from "react";
import styled from "@emotion/styled";

import { BiSearch } from "react-icons/bi";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText: string;
  searchKeywordList: string[];
}

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  width: 100%;

  font-size: 12px;
  color: #595959;
`;

const StyledInputContainer = styled.div`
  display: flex;
  align-items: center;

  height: 48px;
  padding: 0 10px;
  margin-top: 8px;
  gap: 10px;

  background-color: #f7f7f7;
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
  background-color: white;
  border: 1px solid #efefef;
  border-radius: 8px;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const StyledAutocompleteListItem = styled.li`
  height: 40px;
  padding: 10px 20px;
  border-bottom: 1px solid #efefef;

  font-size: 16px;

  :last-child {
    border: none;
  }
`;

const SearchInput = ({
  labelText,
  value,
  searchKeywordList,
}: SearchInputProps) => {
  const [autocompleteList, setAutocompleteList] = useState(searchKeywordList);

  const handleInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: 부모에서 값(value)을 관리하고 변경(onChange)이 필요
    const newAutocompleteList = searchKeywordList.filter((keyword) =>
      keyword.includes(target.value)
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
            <StyledAutocompleteListItem key={autocompleteListItem}>
              {autocompleteListItem}
            </StyledAutocompleteListItem>
          ))}
        </StyledAutocompleteList>
      )}
    </StyledLabel>
  );
};

export default SearchInput;
