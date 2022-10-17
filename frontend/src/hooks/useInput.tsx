import React, { useState, useEffect } from "react";

const useInput = (defaultValue: string) => {
  const [value, setValue] = useState(defaultValue);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { target } = e;

    setValue(target.value);
  };

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return { value, handleInputChange, setValue };
};

export default useInput;
