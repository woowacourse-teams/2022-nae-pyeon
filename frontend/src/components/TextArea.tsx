import React from "react";
import styled from "@emotion/styled";

type TextAreaAttributes = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaAttributes>(
  (props, ref) => {
    return <StyledTextArea ref={ref} {...props} />;
  }
);

const StyledTextArea = styled.textarea`
  width: 300px;
  height: 300px;

  padding: 20px;

  border: none;
  border-radius: 8px;
  background-color: #f7f7f7;

  resize: none;

  :focus {
    outline: none;
  }

  @media only screen and (min-width: 960px) {
    width: 600px;
    height: 400px;
  }
`;

export default TextArea;
