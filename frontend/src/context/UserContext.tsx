import { useState, createContext, PropsWithChildren } from "react";
import { deleteCookie, getCookie, setCookie } from "@/util/cookie";

import appClient from "@/api";

interface UserContextType {
  isLoggedIn: boolean;
  login: (accessToken: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType>(null!);

const UserProvider = ({ children }: PropsWithChildren) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getCookie("accessToken"));

  const login = (accessToken: string) => {
    appClient.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;
    setCookie("accessToken", accessToken);
    setIsLoggedIn(true);
  };

  const logout = () => {
    appClient.defaults.headers.common["Authorization"] = `Bearer `;
    deleteCookie("accessToken");
    setIsLoggedIn(false);
  };

  const value = { isLoggedIn, login, logout };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
