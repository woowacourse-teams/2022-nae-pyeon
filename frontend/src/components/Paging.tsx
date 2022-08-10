import React from "react";
import styled from "@emotion/styled";

import IconButton from "@/components/IconButton";

import LeftIcon from "@/assets/icons/bx-chevron-left.svg";
import RightIcon from "@/assets/icons/bx-chevron-right.svg";

interface PagingProp {
  currentPage: number;
  maxPage: number;
  handleNumberClick: (number: number) => React.MouseEventHandler;
  handleNextClick: React.MouseEventHandler;
  handlePrevClick: React.MouseEventHandler;
}

type StyledPaging = {
  isCurrent: boolean;
};

const Paging = ({
  currentPage,
  maxPage,
  handleNumberClick,
  handleNextClick,
  handlePrevClick,
}: PagingProp) => {
  return (
    <StyledPaging>
      <IconButton onClick={handlePrevClick}>
        <LeftIcon />
      </IconButton>
      {currentPage < 3 || maxPage <= 5 ? (
        <StyledPageButtons>
          {[...Array(maxPage > 5 ? 5 : maxPage).keys()].map((num) => (
            <StyledPage
              isCurrent={currentPage === num}
              key={num}
              onClick={handleNumberClick(num)}
            >
              {num + 1}
            </StyledPage>
          ))}
        </StyledPageButtons>
      ) : currentPage > maxPage - 3 ? (
        <StyledPageButtons>
          {[...Array(5).keys()].reverse().map((num) => (
            <StyledPage
              isCurrent={currentPage === maxPage - num - 1}
              key={num}
              onClick={() => handleNumberClick(maxPage - num - 1)}
            >
              {maxPage - num}
            </StyledPage>
          ))}
        </StyledPageButtons>
      ) : (
        <StyledPageButtons>
          {[...Array(5).keys()].map((num) => (
            <StyledPage
              isCurrent={currentPage === currentPage - (2 - num)}
              key={num}
              onClick={() => handleNumberClick(currentPage - (2 - num))}
            >
              {currentPage - (2 - num) + 1}
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
