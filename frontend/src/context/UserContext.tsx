import { useState, createContext, PropsWithChildren } from "react";
import { deleteCookie, getCookie, setCookie } from "@/util/cookie";

import appClient from "@/api";

interface UserContextType {
  isLoggedIn: boolean;
  login: (accessToken: string, memberId: number) => void;
  logout: () => void;
  memberId: number | null;
}

const UserContext = createContext<UserContextType>(null!);

const UserProvider = ({ children }: PropsWithChildren) => {
  const initialMemberId = getCookie("memberId")
    ? Number(getCookie("memberId"))
    : null;
  const [isLoggedIn, setIsLoggedIn] = useState(!!getCookie("accessToken"));
  const [memberId, setMemberId] = useState(initialMemberId);

  const login = (accessToken: string, memberId: number) => {
    appClient.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;
    setCookie("accessToken", accessToken);
    setCookie("memberId", JSON.stringify(memberId));
    setIsLoggedIn(true);
    setMemberId(memberId);
  };

  const logout = () => {
    appClient.defaults.headers.common["Authorization"] = `Bearer `;
    deleteCookie("accessToken");
    deleteCookie("memberId");
    setIsLoggedIn(false);
    setMemberId(null);
  };

  const value = { isLoggedIn, login, logout, memberId };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
