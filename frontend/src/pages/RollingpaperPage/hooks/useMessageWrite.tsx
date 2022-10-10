import { RECIPIENT } from "@/constants";
import { ValueOf } from "@/types";
import React, { ReactElement } from "react";
import MessageCreateForm from "../components/MessageCreateForm";

interface useMessageWriteProp {
  setMessageComponentList: React.Dispatch<
    React.SetStateAction<
      ReactElement<any, string | React.JSXElementConstructor<any>>[]
    >
  >;
  recipientType: ValueOf<typeof RECIPIENT> | undefined;
}

const useMessageWrite = ({
  setMessageComponentList,
  recipientType,
}: useMessageWriteProp) => {
  const handleWriteEnd = () => {
    setMessageComponentList((prev) => {
      prev.shift();
      return [...prev];
    });
  };

  const handleWriteButtonClick = () => {
    setMessageComponentList((prev) => [
      <MessageCreateForm
        key="messageCreateForm"
        enableSecretMessage={recipientType === RECIPIENT.MEMBER}
        onEditEnd={handleWriteEnd}
      />,
      ...prev,
    ]);
  };

  return { handleWriteButtonClick, handleWriteEnd };
};

export default useMessageWrite;
