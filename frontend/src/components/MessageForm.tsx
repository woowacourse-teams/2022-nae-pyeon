import React, { useState } from "react";
import styled from "@emotion/styled";
import MessageTextArea from "./MessageTextArea";
import MessageColorPicker from "./MessageColorPicker";

const colors = [
  { id: 1, value: "#C5FF98" },
  { id: 2, value: "#FF8181" },
  { id: 3, value: "#FFF598" },
  { id: 4, value: "#98DAFF" },
  { id: 5, value: "#98A2FF" },
  { id: 6, value: "#FF98D0" },
];

export const MessageForm = () => {
  const [content, setContent] = useState("");
  const [color, setColor] = useState(colors[0].value);

  const handleTextAreaChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    if (e.target.value.length > 500) {
      return;
    }
    setContent(e.target.value);
  };

  return (
    <StyledMessageForm>
      <MessageTextArea
        placeholder="메시지를 입력해보세요!"
        value={content}
        onChange={handleTextAreaChange}
        backgroundColor={color}
      />
      <MessageColorPicker
        radios={colors}
        initialSelectedId={colors[0].id}
        onClickRadio={setColor}
      />
    </StyledMessageForm>
  );
};

const StyledMessageForm = styled.form`
  position: relative;
  display: flex;
  flex-direction: row;
`;

export default MessageForm;
