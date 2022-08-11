import React from "react";
import styled from "@emotion/styled";

import SearchIcon from "@/assets/icons/bx-search.svg";

interface AutoCompleteInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
  autoCompleteList: string[];
  isOpen: boolean;
  onClickListItem: (item: string) => React.MouseEventHandler<HTMLElement>;
}

const AutoCompleteInput = React.forwardRef<
  HTMLInputElement,
  AutoCompleteInputProps
>(({ labelText, autoCompleteList, isOpen, onClickListItem, ...prop }, ref) => {
  return (
    <StyledLabel>
      {labelText}
      <StyledInputContainer>
        <SearchIcon />
        <input ref={ref} {...prop} />
      </StyledInputContainer>
      {isOpen && autoCompleteList.length > 0 && (
        <StyledAutocompleteList>
          {autoCompleteList.map((autocompleteListItem) => (
            <StyledAutocompleteListItem
              key={autocompleteListItem}
              onClick={onClickListItem(autocompleteListItem)}
            >
              {autocompleteListItem}
            </StyledAutocompleteListItem>
          ))}
        </StyledAutocompleteList>
      )}
    </StyledLabel>
  );
});

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
  gap: 10px;

  height: 48px;
  padding: 0 10px;
  margin-top: 8px;

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
  margin-top: 5px;
  top: 73px;
  z-index: 2;

  width: 100%;
  max-height: 150px;
  overflow-y: scroll;

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
