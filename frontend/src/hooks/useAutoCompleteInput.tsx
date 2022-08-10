import React, {
  useState,
  useEffect,
  useRef,
  ChangeEventHandler,
  MouseEventHandler,
} from "react";

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

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
    const newAutoCompleteList = sortAutoCompleteList(e.target.value);

    setAutoCompleteList(newAutoCompleteList);
  };

  const onFocus: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (ref.current) {
      ref.current.focus();

      const newAutoCompleteList = sortAutoCompleteList(e.target.value);

      setAutoCompleteList(newAutoCompleteList);

      setIsOpen(true);
    }
  };

  const onClick: MouseEventHandler<HTMLElement> = (e) => {
    const selectedItem = e.target as HTMLElement;
    setValue(selectedItem.innerText);
  };

  const handleDocumentClick = (e: MouseEvent) => {
    e.preventDefault();

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
    onChange,
    onFocus,
    onClick,
    setKeywordList,
  };
};

export default useAutoCompleteInput;
