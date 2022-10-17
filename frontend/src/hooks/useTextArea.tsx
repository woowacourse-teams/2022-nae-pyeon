import React, { useState } from "react";

interface UseTextAreaParams {
  initialValue: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
}

const useTextArea = ({ initialValue, onChange }: UseTextAreaParams) => {
  const [value, setValue] = useState(initialValue);

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setValue(e.target.value);

    if (onChange) {
      onChange(e);
    }
  };

  return {
    value,
    handleChange,
  };
};

export default useTextArea;
