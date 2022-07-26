import React, { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";

import SearchIcon from "@/assets/icons/bx-search.svg";

interface AutoCompleteInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText: string;
  searchKeywordList: string[];
  setValue: (value: string) => void;
}

const AutoCompleteInput = ({
  labelText,
  value,
  setValue,
  searchKeywordList,
}: AutoCompleteInputProps) => {
  const [autocompleteList, setAutocompleteList] = useState(searchKeywordList);
  const [isOpen, setIsOpen] = useState(false);

  const AutoCompleteInputRef = useRef(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);

    const newAutocompleteList = searchKeywordList.filter((keyword) =>
      keyword.includes(e.target.value)
    );
    setAutocompleteList(newAutocompleteList);
  };

  const handleDocumentClick = (e: MouseEvent) => {
    if (AutoCompleteInputRef.current === e.target) {
      return;
    }
    setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <StyledLabel>
      {labelText}
      <StyledInputContainer>
        <SearchIcon />
        <input
          ref={AutoCompleteInputRef}
          value={value}
          onChange={handleInputChange}
          onFocus={() => {
            setIsOpen(true);
          }}
        />
      </StyledInputContainer>
      {isOpen && autocompleteList.length > 0 && (
        <StyledAutocompleteList>
          {autocompleteList.map((autocompleteListItem) => (
            <StyledAutocompleteListItem
              key={autocompleteListItem}
              onClick={() => {
                const newAutocompleteList = searchKeywordList.filter(
                  (keyword) => keyword.includes(autocompleteListItem)
                );
                setValue(autocompleteListItem);
                setAutocompleteList(newAutocompleteList);
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
  position: relative;

  display: flex;
  flex-direction: column;
  width: 100%;

  font-size: 14px;
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
  position: absolute;
  top: 73px;
  z-index: 2;

  width: 100%;
  max-height: 150px;
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

  cursor: pointer;

  :hover {
    background-color: ${({ theme }) => theme.colors.GRAY_100};
  }

  :last-child {
    border: none;
  }
`;

export default AutoCompleteInput;
