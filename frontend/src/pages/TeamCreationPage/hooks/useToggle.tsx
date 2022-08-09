import React, { useState } from "react";

const useToggle = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggleClick = () => {
    setIsChecked((prev) => !prev);
  };

  return { isChecked, handleToggleClick };
};

export default useToggle;
