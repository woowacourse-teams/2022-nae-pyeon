import React, { useState } from "react";

const useMessageWrite = () => {
  const [isWrite, setIsWrite] = useState(false);

  const handleWriteButtonClick = () => {
    setIsWrite(true);
  };

  const handleWriteEnd = () => {
    setIsWrite(false);
  };

  return { isWrite, handleWriteButtonClick, handleWriteEnd };
};

export default useMessageWrite;
