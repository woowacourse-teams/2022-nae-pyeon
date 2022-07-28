import React, { useState } from "react";
import styled from "@emotion/styled";
import MessageTextArea from "./MessageTextArea";
import MessageColorPicker from "./MessageColorPicker";

import CheckIcon from "@/assets/icons/bx-check.svg";
import TrashIcon from "@/assets/icons/bx-trash.svg";

const colors = [
  { id: 1, value: "#C5FF98" },
  { id: 2, value: "#FF8181" },
  { id: 3, value: "#FFF598" },
  { id: 4, value: "#98DAFF" },
  { id: 5, value: "#98A2FF" },
  { id: 6, value: "#FF98D0" },
];

type MessageFormProps = {
  hideMessageForm: () => void;
};

type ButtonAttributes = React.ButtonHTMLAttributes<HTMLButtonElement>;

const MessageSubmitButton = ({ onClick }: ButtonAttributes) => {
  return (
    <CircleButton type="button" onClick={onClick}>
      <CheckIcon />
    </CircleButton>
  );
};

const MessageCancelButton = ({ onClick }: ButtonAttributes) => {
  return (
    <CircleButton type="button" onClick={onClick}>
      <TrashIcon />
    </CircleButton>
  );
};

export const MessageForm = ({ hideMessageForm }: MessageFormProps) => {
  const [content, setContent] = useState("");
  const [color, setColor] = useState(colors[0].value);

  const handleTextAreaChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    const newContent = e.target.value;
    if (newContent.length > 500) {
      return;
    }
    setContent(newContent);
  };

  const handleSubmitButtonClick: React.MouseEventHandler = () => {
    hideMessageForm();
  };

  const handleCancelButtonClick: React.MouseEventHandler = () => {
    hideMessageForm();
  };

  return (
    <>
      <Background />
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
        <IconButtonContainer>
          <MessageSubmitButton onClick={handleSubmitButtonClick} />
          <MessageCancelButton onClick={handleCancelButtonClick} />
        </IconButtonContainer>
      </StyledMessageForm>
    </>
  );
};

const StyledMessageForm = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  background: transparent;
`;

const IconButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-self: center;
  gap: 20px;

  margin-top: 4px;

  @media only screen and (min-width: 600px) {
    margin-top: 8px;
  }
`;

const CircleButton = styled.button`
  width: 32px;
  height: 32px;

  font-size: 18px;
  color: white;

  border: none;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.GRAY_700};
  fill: ${({ theme }) => theme.colors.GRAY_200};

  &:hover {
    border: 2px solid ${({ theme }) => theme.colors.GRAY_700};
    background-color: ${({ theme }) => theme.colors.GRAY_300};
    fill: ${({ theme }) => theme.colors.GRAY_800};
  }

  @media only screen and (min-width: 600px) {
    width: 36px;
    height: 36px;

    font-size: 20px;
  }
`;

export default MessageForm;
