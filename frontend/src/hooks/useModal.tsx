import React, { useState } from "react";

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  return { isOpen, handleModalClose, handleModalOpen };
};

export default useModal;
