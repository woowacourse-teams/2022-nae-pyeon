import React, { useState } from "react";

import useInput from "@/hooks/useInput";
import useSwitch from "@/hooks/useSwitch";

const useTeamCreationForm = () => {
  const { value: teamName, handleInputChange: handleTeamNameChange } =
    useInput("");
  const {
    value: teamDescription,
    handleInputChange: handleTeamDescriptionChange,
  } = useInput("");
  const [emoji, setEmoji] = useState("");
  const [color, setColor] = useState("");
  const { value: nickname, handleInputChange: handleNicknameChange } =
    useInput("");
  const { isChecked: isSecretTeam, handleSwitchClick } = useSwitch();

  return {
    teamName,
    teamDescription,
    emoji,
    color,
    nickname,
    isSecretTeam,
    handleTeamNameChange,
    handleTeamDescriptionChange,
    setEmoji,
    setColor,
    handleNicknameChange,
    handleSwitchClick,
  };
};

export default useTeamCreationForm;
