import React, { useState } from "react";

const useSwitch = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleSwitchClick = () => {
    setIsChecked((prev) => !prev);
  };

  return { isChecked, handleSwitchClick };
};

export default useSwitch;
