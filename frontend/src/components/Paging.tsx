import React from "react";
import styled from "@emotion/styled";

import IconButton from "@/components/IconButton";

import LeftIcon from "@/assets/icons/bx-chevron-left.svg";
import RightIcon from "@/assets/icons/bx-chevron-right.svg";

interface PagingProp {
  currentPage: number;
  lastPage: number;
  handleNumberClick: (number: number) => React.MouseEventHandler;
  handleNextClick: React.MouseEventHandler;
  handlePrevClick: React.MouseEventHandler;
}

type StyledPaging = {
  isCurrent: boolean;
};

const MAX_PAGE_COUNT = 5;

const Paging = ({
  currentPage,
  lastPage,
  handleNumberClick,
  handleNextClick,
  handlePrevClick,
}: PagingProp) => {
  return (
    <StyledPaging>
      <IconButton onClick={handlePrevClick}>
        <LeftIcon />
      </IconButton>
      {currentPage < Math.ceil(MAX_PAGE_COUNT / 2) ||
      lastPage <= MAX_PAGE_COUNT ? (
        <StyledPageButtons>
          {[
            ...Array(
              lastPage > MAX_PAGE_COUNT ? MAX_PAGE_COUNT : lastPage
            ).keys(),
          ].map((num) => (
            <StyledPage
              isCurrent={currentPage === num}
              key={num}
              onClick={handleNumberClick(num)}
            >
              {num + 1}
            </StyledPage>
          ))}
        </StyledPageButtons>
      ) : currentPage > lastPage - Math.ceil(MAX_PAGE_COUNT / 2) ? (
        <StyledPageButtons>
          {[...Array(MAX_PAGE_COUNT).keys()].reverse().map((num) => (
            <StyledPage
              isCurrent={currentPage === lastPage - num - 1}
              key={num}
              onClick={handleNumberClick(lastPage - num - 1)}
            >
              {lastPage - num}
            </StyledPage>
          ))}
        </StyledPageButtons>
      ) : (
        <StyledPageButtons>
          {[...Array(MAX_PAGE_COUNT).keys()].map((num) => (
            <StyledPage
              isCurrent={
                currentPage ===
                currentPage - (Math.floor(MAX_PAGE_COUNT / 2) - num)
              }
              key={num}
              onClick={handleNumberClick(
                currentPage - (Math.floor(MAX_PAGE_COUNT / 2) - num)
              )}
            >
              {currentPage - (Math.floor(MAX_PAGE_COUNT / 2) - num) + 1}
            </StyledPage>
          ))}
        </StyledPageButtons>
      )}
      <IconButton onClick={handleNextClick}>
        <RightIcon />
      </IconButton>
    </StyledPaging>
  );
};

const StyledPaging = styled.div`
  display: flex;

  svg {
    font-size: 24px;
  }
`;

const StyledPageButtons = styled.div`
  display: flex;
`;

const StyledPage = styled.div<StyledPaging>`
  width: 24px;
  text-align: center;
  line-height: 24px;
  margin: 2px;

  color: ${(props) =>
    props.isCurrent ? props.theme.colors.WHITE : props.theme.colors.BLACK};

  background-color: ${(props) =>
    props.isCurrent && props.theme.colors.SKY_BLUE_300};
  border-radius: 50%;

  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      !props.isCurrent && props.theme.colors.SKY_BLUE_100};
  }
`;

export default Paging;
