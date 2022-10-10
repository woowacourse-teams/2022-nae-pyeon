import React, { useState } from "react";
import useDeleteMessage from "@/pages/RollingpaperPage/hooks/useDeleteMessage";

interface UseMessageProps {
  id: number;
  rollingpaperId: number;
  handleEditButtonClick: () => void;
}

const useMessageBox = ({
  id,
  rollingpaperId,
  handleEditButtonClick,
}: UseMessageProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const { deleteRollingpaperMessage } = useDeleteMessage(rollingpaperId);

  const handleWriteButtonClick: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    handleEditButtonClick();
    setIsEdit(true);
  };

  const handleDeleteButtonClick = () => {
    if (id) {
      handleEditButtonClick();
      deleteRollingpaperMessage(id);
    }
  };

  const handleEditEnd = () => {
    setIsEdit(false);
  };

  return {
    isEdit,
    handleWriteButtonClick,
    handleDeleteButtonClick,
    handleEditEnd,
  };
};

export default useMessageBox;
