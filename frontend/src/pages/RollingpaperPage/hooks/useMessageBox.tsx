import React, { useState } from "react";
import useDeleteMessage from "@/pages/RollingpaperPage/hooks/useDeleteMessage";

interface UseMessageProps {
  id?: number;
  rollingpaperId: number;
}

const useMessage = ({ id, rollingpaperId }: UseMessageProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const { deleteRollingpaperMessage } = useDeleteMessage(rollingpaperId);

  const handleWriteButtonClick: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    setIsEdit(true);
  };

  const handleDeleteButtonClick = () => {
    if (id) {
      deleteRollingpaperMessage(id);
    }
  };

  return {
    isEdit,
    handleWriteButtonClick,
    handleDeleteButtonClick,
    setIsEdit,
  };
};

export default useMessage;
