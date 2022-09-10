import React, { useState, useEffect, useRef } from "react";

import { divideArrayByIndexRemainder } from "@/util";
import { EmotionJSX } from "@emotion/react/types/jsx-namespace";

const useSliceMessageList = (messageList: (Element | EmotionJSX.Element)[]) => {
  const messageListRef = useRef(messageList);
  const [slicedMessageLists, setSlicedMessageLists] = useState<
    (Element | EmotionJSX.Element)[][]
  >(Array.from(Array(4), () => []));

  const updateSlicedMessageListByWindowWidth = () => {
    const width = window.innerWidth;

    let newSlicedMessageList;
    if (width < 960) {
      newSlicedMessageList = [messageListRef.current];
    } else if (width < 1280) {
      newSlicedMessageList = divideArrayByIndexRemainder(
        messageListRef.current,
        2
      );
    } else {
      newSlicedMessageList = divideArrayByIndexRemainder(
        messageListRef.current,
        3
      );
    }

    setSlicedMessageLists(newSlicedMessageList);
  };

  useEffect(() => {
    messageListRef.current = messageList;
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
