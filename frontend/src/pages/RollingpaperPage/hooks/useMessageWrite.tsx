import React, { useState } from "react";

type UseMessageWriterArgs = {
  onClickWriteButton: () => void;
  onClickWriteEnd: () => void;
};

const useMessageWrite = ({
  onClickWriteButton,
  onClickWriteEnd,
}: UseMessageWriterArgs) => {
  const [isWrite, setIsWrite] = useState(false);

  const handleWriteButtonClick = () => {
    onClickWriteButton();
    setIsWrite(true);
  };

  const handleWriteEnd = () => {
    onClickWriteEnd();
    setIsWrite(false);
  };

  return { isWrite, handleWriteButtonClick, handleWriteEnd };
};

export default useMessageWrite;
