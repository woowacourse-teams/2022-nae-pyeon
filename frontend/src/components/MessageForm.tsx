import React, { Dispatch, SetStateAction } from "react";
import styled from "@emotion/styled";
import MessageTextArea from "@/components/MessageTextArea";
import MessageColorPicker from "@/components/MessageColorPicker";

import CheckIcon from "@/assets/icons/bx-check.svg";
import TrashIcon from "@/assets/icons/bx-trash.svg";

type MessageFormProps = {
  onSubmit: () => void;
  onCancel: () => void;
  content: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  color: string;
  onClickColor: Dispatch<SetStateAction<string>>;
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

export const MessageForm = ({
  onSubmit,
  onCancel,
  content,
  onChange,
  color,
  onClickColor,
}: MessageFormProps) => {
  const handleTextAreaChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    if (e.target.value.length > 500) {
      return;
    }
    onChange(e);
  };

  return (
    <>
      <Background />
      <StyledMessageForm>
        <MessageTextArea
          placeholder="메시지를 입력해보세요!"
          content={content}
          onChange={handleTextAreaChange}
          backgroundColor={color}
        />
        <MessageColorPicker onClickRadio={onClickColor} color={color} />
        <IconButtonContainer>
          <MessageSubmitButton onClick={onSubmit} />
          <MessageCancelButton onClick={onCancel} />
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
