import { useState, ChangeEventHandler } from "react";

const useInput = (defaultValue: string) => {
  const [value, setValue] = useState(defaultValue);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { target } = e;

    setValue(target.value);
  };

  return { value, onChange, setValue };
};

export default useInput;
