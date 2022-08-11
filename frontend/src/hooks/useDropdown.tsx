import React, { useState } from "react";

const useDropdown = () => {
  const [isOpened, setIsOpened] = useState(false);

  const handleButtonClick = () => {
    setIsOpened((prev) => !prev);
  };

  const handleOptionClick = (callback: () => void) => {
    setIsOpened(false);
    callback();
  };

  return { isOpened, handleButtonClick, handleOptionClick };
};

export default useDropdown;
