import React from "react";
import styled from "@emotion/styled";

interface LabeledRadioProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  labelText: string;
}

const LabeledTextArea = React.forwardRef<
  HTMLTextAreaElement,
  LabeledRadioProps
>((props, ref) => {
  return (
    <StyledLabel>
      {props.labelText}
      <StyledTextarea
        maxLength={100}
        ref={ref}
        placeholder={props.placeholder}
      />
    </StyledLabel>
  );
});

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;

  font-size: 14px;
  color: ${({ theme }) => theme.colors.GRAY_600};
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  height: 60px;
  padding: 10px;
  margin-top: 8px;

  font-size: 16px;

  border: none;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.GRAY_100};

  resize: none;
  overflow: hidden;

  :focus {
    outline: none;
  }
`;

export default LabeledTextArea;
