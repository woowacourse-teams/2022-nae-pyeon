import React, { useState } from "react";

const useMessageBox = () => {
  const [isEdit, setIsEdit] = useState(false);

  const handleWriteButtonClick: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    setIsEdit(true);
  };

  const handleEditEnd = () => {
    setIsEdit(false);
  };

  return {
    isEdit,
    handleWriteButtonClick,
    handleEditEnd,
  };
};

export default useMessageBox;
