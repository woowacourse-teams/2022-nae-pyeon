import React, { useState } from "react";

const usePaging = (maxPage: number) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handleNumberClick =
    (number: number): React.MouseEventHandler =>
    () => {
      setCurrentPage(number);
    };

  const handlePrevClick = () => {
    if (currentPage <= 0) {
      return;
    }
    setCurrentPage((prev) => prev - 1);
  };

  const handleNextClick = () => {
    if (currentPage + 1 >= maxPage) {
      return;
    }
    setCurrentPage((prev) => prev + 1);
  };

  return { currentPage, handleNumberClick, handleNextClick, handlePrevClick };
};

export default usePaging;
