import React, { Dispatch, SetStateAction } from "react";
import styled from "@emotion/styled";
import MessageTextArea from "@/pages/RollingpaperPage/components/MessageTextArea";
import MessageColorPicker from "@/pages/RollingpaperPage/components/MessageColorPicker";

import LabeledCheckBox from "@/components/LabeledCheckBox";

import useCheckBox from "@/hooks/useCheckBox";

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
    <StyledMessageFormButton type="button" onClick={onClick}>
      <CheckIcon />
      저장
    </StyledMessageFormButton>
  );
};

const MessageCancelButton = ({ onClick }: ButtonAttributes) => {
  return (
    <StyledMessageFormButton type="button" onClick={onClick}>
      <XIcon />
      취소
    </StyledMessageFormButton>
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
  const {
    checked: anonymousChecked,
    handleChange: handleAnonymousCheckBoxChange,
  } = useCheckBox({ initialCheckedState: false });

  const { checked: secretChecked, handleChange: handleSecretCheckBoxChange } =
    useCheckBox({ initialCheckedState: false });

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
        <StyledMessageFormBottom>
          <StyledCheckBoxContainer>
            <LabeledCheckBox
              labeledText="익명"
              checked={anonymousChecked}
              onChange={handleAnonymousCheckBoxChange}
            />
            <LabeledCheckBox
              labeledText="비밀글"
              checked={secretChecked}
              onChange={handleSecretCheckBoxChange}
            />
          </StyledCheckBoxContainer>
          <StyledTextLength>{content.length}/500</StyledTextLength>
        </StyledMessageFormBottom>
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

const StyledMessageFormBottom = styled.div`
  position: absolute;
  bottom: 0;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: max-content;
  padding: 0 15px 15px;
`;

const StyledCheckBoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

const StyledTextLength = styled.div`
  display: inline;
  align-self: flex-end;

  color: ${({ theme }) => theme.colors.GRAY_600};
`;

const StyledMessageColorPickerWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -105%);

  width: 80%;
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
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 110%);

  width: 90%;

  display: flex;
  flex-direction: row;
  align-self: center;
  justify-content: space-evenly;

  margin-top: 4px;

  @media only screen and (min-width: 600px) {
    margin-top: 8px;
  }
`;

const StyledMessageFormButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  width: 80px;
  height: 32px;

  font-size: 18px;

  border: none;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.GRAY_700};
  color: ${({ theme }) => theme.colors.GRAY_200};
  fill: ${({ theme }) => theme.colors.GRAY_200};

  &:hover {
    border: 2px solid ${({ theme }) => theme.colors.GRAY_700};
    background-color: ${({ theme }) => theme.colors.GRAY_300};
    color: ${({ theme }) => theme.colors.GRAY_800};
    fill: ${({ theme }) => theme.colors.GRAY_800};
  }

  @media only screen and (min-width: 600px) {
    width: 120px;
    height: 36px;

    font-size: 20px;
  }
`;

export default MessageForm;
