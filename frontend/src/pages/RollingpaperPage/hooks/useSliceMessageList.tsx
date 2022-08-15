import React, { useState, useEffect } from "react";

import { divideArrayByIndexRemainder } from "@/util";

import { Message } from "@/types";

const useSliceMessageList = (messageList: Message[]) => {
  const [slicedMessageLists, setSlicedMessageLists] = useState<Message[][]>(
    Array.from(Array(4), () => [])
  );

  const updateSlicedMessageListByWindowWidth = () => {
    const width = window.innerWidth;

    let newSlicedMessageList;
    if (width < 960) {
      newSlicedMessageList = [messageList];
    } else if (width < 1280) {
      newSlicedMessageList = divideArrayByIndexRemainder(messageList, 2);
    } else {
      newSlicedMessageList = divideArrayByIndexRemainder(messageList, 3);
    }

    setSlicedMessageLists(newSlicedMessageList);
  };

  useEffect(() => {
    updateSlicedMessageListByWindowWidth();
  }, [messageList]);

  useEffect(() => {
    window.addEventListener("resize", updateSlicedMessageListByWindowWidth);
    return () =>
      window.removeEventListener(
        "resize",
        updateSlicedMessageListByWindowWidth
      );
  }, []);

  return slicedMessageLists;
};

export default useSliceMessageList;
