import { useState, createContext, PropsWithChildren } from "react";

import { appClient } from "@/api";
import { deleteCookie, getCookie, setCookie } from "@/util/cookie";

const COOKIE_KEY = {
  ACCESS_TOKEN: "accessToken",
};

interface UserContextType {
  isLoggedIn: boolean;
  login: (accessToken: string, memberId: number) => void;
  logout: () => void;
  memberId: number | null;
}

const UserContext = createContext<UserContextType>(null!);

const UserProvider = ({ children }: PropsWithChildren) => {
  const accessTokenCookie = getCookie(COOKIE_KEY.ACCESS_TOKEN);

  const [isLoggedIn, setIsLoggedIn] = useState(!!accessTokenCookie);
  const [memberId, setMemberId] = useState<number | null>(null);

  const login = (accessToken: string, memberId: number) => {
    appClient.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;
    setCookie(COOKIE_KEY.ACCESS_TOKEN, accessToken);
    setIsLoggedIn(true);
    setMemberId(memberId);
  };

  const logout = () => {
    appClient.defaults.headers.common["Authorization"] = `Bearer `;
    deleteCookie(COOKIE_KEY.ACCESS_TOKEN);
    setIsLoggedIn(false);
    setMemberId(null);
  };

  const value = { isLoggedIn, login, logout, memberId };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
