import { getCookie } from "@/util/cookie";
import { useState, createContext, PropsWithChildren } from "react";

interface UserContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

const UserContext = createContext<UserContextType>(null!);

const UserProvider = ({ children }: PropsWithChildren) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getCookie("accessToken"));

  const value = { isLoggedIn, setIsLoggedIn };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
