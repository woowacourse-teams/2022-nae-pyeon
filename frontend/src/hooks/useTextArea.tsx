import React, { useState } from "react";

type useTextAreaArgs = {
  initialValue: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
};

const useTextArea = ({ initialValue, onChange }: useTextAreaArgs) => {
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
