import React from "react";
import styled from "@emotion/styled";

const CheckBox = ({
  onChange,
  checked,
}: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <StyledCheckBoxInput
      type="checkbox"
      onChange={onChange}
      checked={checked}
    />
  );
};

const StyledCheckBoxInput = styled.input`
  appearance: none;

  width: 20px;
  height: 20px;

  border: 2px solid ${({ theme }) => theme.colors.SKY_BLUE_300};
  border-radius: 2px;
  background-color: ${({ theme }) => theme.colors.GRAY_100};

  &:hover {
    cursor: pointer;
  }

  &:checked {
    background-position: 50% 45%;
    background-repeat: no-repeat;
    background-image: url("data:image/svg+xml,%3Csvg width='13px' viewBox='0 0 23 17' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2 7L9.11069 14.1107L21.8318 1.38956' stroke='%23242424' stroke-width='3'/%3E%3C/svg%3E%0A");
  }
`;

export default CheckBox;
