import React, { useState } from "react";
import { useDeleteMessage } from "@/hooks/api/message";

interface UseMessageParams {
  id: number;
  rollingpaperId: number;
}

const useMessageBox = ({ id, rollingpaperId }: UseMessageParams) => {
  const [isEdit, setIsEdit] = useState(false);
  const { mutate: deleteRollingpaperMessage } = useDeleteMessage();

  const handleWriteButtonClick: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    setIsEdit(true);
  };

  const handleDeleteButtonClick = () => {
    if (confirm("메시지를 정말 삭제하시겠습니까?") && id) {
      deleteRollingpaperMessage({ rollingpaperId, id });
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
