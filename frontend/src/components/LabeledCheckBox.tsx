import React from "react";
import styled from "@emotion/styled";

type LabeledCheckBoxProps = {
  labeledText: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

type StyledLabelProps = {
  checked?: boolean | undefined;
};

const LabeledCheckBox = ({
  onChange,
  checked,
  labeledText,
}: LabeledCheckBoxProps) => {
  return (
    <StyledLabel checked={checked}>
      <StyledCheckBoxInput
        type="checkbox"
        onChange={onChange}
        checked={checked}
      />
      {labeledText}
    </StyledLabel>
  );
};

const StyledLabel = styled.label<StyledLabelProps>`
  display: flex;
  align-items: center;
  gap: 4px;

  color: ${({ checked, theme }) =>
    checked ? theme.colors.GRAY_800 : theme.colors.GRAY_600};
`;

const StyledCheckBoxInput = styled.input`
  appearance: none;

  width: 20px;
  height: 20px;
  font-size: 14px;

  border: 2px solid ${({ theme }) => theme.colors.GRAY_600};
  border-radius: 2px;
  background-color: transparent;

  &:hover {
    cursor: pointer;
  }

  &:checked {
    border: 2px solid ${({ theme }) => theme.colors.GRAY_800};

    background-position: 50% 45%;
    background-repeat: no-repeat;
    background-image: url("data:image/svg+xml,%3Csvg width='13px' viewBox='0 0 23 17' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2 7L9.11069 14.1107L21.8318 1.38956' stroke='%23242424' stroke-width='3'/%3E%3C/svg%3E%0A");
  }
`;

export default LabeledCheckBox;
