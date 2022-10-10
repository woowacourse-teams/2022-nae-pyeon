import React, { useState } from "react";

import { ValueOf } from "@/types";
import { ROLLINGPAPER_STATE_TYPE } from "@/constants";

const useMessageWrite = () => {
  const [rollingpaperState, setRollingpaperState] = useState<
    ValueOf<typeof ROLLINGPAPER_STATE_TYPE>
  >(ROLLINGPAPER_STATE_TYPE.LOADING);

  const handleWriteButtonClick = () => {
    setRollingpaperState(ROLLINGPAPER_STATE_TYPE.WRITE);
  };

  const handleEditButtonClick = () => {
    setRollingpaperState(ROLLINGPAPER_STATE_TYPE.EDIT);
  };

  const handleWriteEnd = () => {
    setRollingpaperState(ROLLINGPAPER_STATE_TYPE.NORMAL);
  };

  return {
    rollingpaperState,
    handleWriteButtonClick,
    handleEditButtonClick,
    handleWriteEnd,
  };
};

export default useMessageWrite;
