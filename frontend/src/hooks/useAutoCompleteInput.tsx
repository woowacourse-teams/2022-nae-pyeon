import React, { useState, useEffect, useRef } from "react";

const useAutoCompleteInput = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");
  const [searchKeywordList, setKeywordList] = useState<string[]>([]);
  const [autoCompleteList, setAutoCompleteList] = useState<string[]>([]);
  const ref = useRef<HTMLInputElement>(null);

  const sortAutoCompleteList = (value: string) => {
    const newAutocompleteList = searchKeywordList.filter((keyword) =>
      keyword.includes(value)
    );

    return newAutocompleteList;
  };

  const handleAutoInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setValue(e.target.value);
    const newAutoCompleteList = sortAutoCompleteList(e.target.value);

    setAutoCompleteList(newAutoCompleteList);
  };

  const handleAutoInputFocus: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    if (ref.current) {
      ref.current.focus();

      const newAutoCompleteList = sortAutoCompleteList(e.target.value);

      setAutoCompleteList(newAutoCompleteList);
      setIsOpen(true);
    }
  };

  const handleListItemClick =
    (item: string): React.MouseEventHandler<HTMLLIElement> =>
    () => {
      setValue(item);
    };

  const handleDocumentClick = (e: MouseEvent) => {
    if (ref.current === e.target) {
      return;
    }
    setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return {
    value,
    isOpen,
    autoCompleteList,
    ref,
    handleAutoInputChange,
    handleAutoInputFocus,
    handleListItemClick,
    setKeywordList,
  };
};

export default useAutoCompleteInput;
