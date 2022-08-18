import { useState, ChangeEventHandler } from "react";

const useInput = (defaultValue: string) => {
  const [value, setValue] = useState(defaultValue);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { target } = e;

    setValue(target.value);
  };

  return { value, handleInputChange, setValue };
};

export default useInput;
