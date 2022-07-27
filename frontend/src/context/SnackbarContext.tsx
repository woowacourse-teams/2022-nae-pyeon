/* eslint-disable @typescript-eslint/no-empty-function */
import { useState, createContext, PropsWithChildren } from "react";

interface SnackbarContextType {
  openSnackbar: (message: string) => void;
  closeSnackbar: () => void;
  message: string;
  isOpened: boolean;
}

const SnackbarContext = createContext<SnackbarContextType>({
  openSnackbar: () => {},
  closeSnackbar: () => {},
  message: "",
  isOpened: true,
});

let timer: NodeJS.Timeout;

const SnackbarProvider = ({ children }: PropsWithChildren) => {
  const [isOpened, setIsOpened] = useState(false);
  const [message, setMessage] = useState("");

  const openSnackbar = (message: string) => {
    setIsOpened(true);
    setMessage(message);

    timer = setTimeout(() => {
      closeSnackbar();
    }, 3000);
  };

  const closeSnackbar = () => {
    clearTimeout(timer);
    setIsOpened(false);
  };

  const value = { openSnackbar, closeSnackbar, message, isOpened };

  return (
    <SnackbarContext.Provider value={value}>
      {children}
    </SnackbarContext.Provider>
  );
};

export { SnackbarContext, SnackbarProvider };
