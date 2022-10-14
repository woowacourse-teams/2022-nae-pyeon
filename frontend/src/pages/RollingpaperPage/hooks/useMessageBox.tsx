import React, { useState } from "react";
import useDeleteMessage from "@/pages/RollingpaperPage/hooks/useDeleteMessage";

interface UseMessageProps {
  id: number;
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
    if (confirm("메시지를 정말 삭제하시겠습니까?") && id) {
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

export default useMessage;
