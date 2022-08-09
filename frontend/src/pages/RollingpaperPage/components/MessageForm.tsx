import React, { Dispatch, SetStateAction } from "react";
import styled from "@emotion/styled";
import MessageTextArea from "@/pages/RollingpaperPage/components/MessageTextArea";
import MessageColorPicker from "@/pages/RollingpaperPage/components/MessageColorPicker";

import CheckIcon from "@/assets/icons/bx-check.svg";
import XIcon from "@/assets/icons/bx-x.svg";

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
      작성 완료
    </CircleButton>
  );
};

const MessageCancelButton = ({ onClick }: ButtonAttributes) => {
  return (
    <CircleButton type="button" onClick={onClick}>
      작성 취소
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
          value={content}
          onChange={handleTextAreaChange}
          backgroundColor={color}
        />
        <StyledMessageColorPickerWrapper>
          <MessageColorPicker onClickRadio={onClickColor} color={color} />
        </StyledMessageColorPickerWrapper>

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

const StyledMessageColorPickerWrapper = styled.div`
  position: absolute;
  right: 0;
  transform: translateX(105%);
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
  width: 120px;
  height: 32px;

  font-size: 18px;

  border: none;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.GRAY_700};
  color: ${({ theme }) => theme.colors.GRAY_200};

  &:hover {
    border: 2px solid ${({ theme }) => theme.colors.GRAY_700};
    background-color: ${({ theme }) => theme.colors.GRAY_300};
    color: ${({ theme }) => theme.colors.GRAY_800};
  }

  @media only screen and (min-width: 600px) {
    width: 120px;
    height: 36px;

    font-size: 20px;
  }
`;

export default MessageForm;
