import React, { useState } from "react";

type UseCheckBoxArgs = {
  initialCheckedState: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

const useCheckBox = ({ initialCheckedState, onChange }: UseCheckBoxArgs) => {
  const [checked, setChecked] = useState(initialCheckedState);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setChecked((prev) => !prev);

    if (onChange) {
      onChange(e);
    }
  };

  return {
    checked,
    handleChange,
  };
};

export default useCheckBox;
