import React from "react";
import styled from "@emotion/styled";
import CheckBox from "@/components/CheckBox";

interface LabeledCheckBoxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  labeledText: string;
}

interface StyledLabelProps {
  checked?: boolean | undefined;
}

const LabeledCheckBox = ({
  onChange,
  checked,
  labeledText,
}: LabeledCheckBoxProps) => {
  return (
    <StyledLabel checked={checked}>
      <CheckBox type="checkbox" checked={checked} onChange={onChange} />
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

export default LabeledCheckBox;
