import { useState, createContext, PropsWithChildren } from "react";

import { setAppClientHeaderAuthorization } from "@/api";
import { deleteCookie, setCookie } from "@/util/cookie";

const COOKIE_KEY = {
  ACCESS_TOKEN: "accessToken",
};

interface UserContextType {
  isLoggedIn: boolean;
  memberId: number | null;
  login: (accessToken: string, memberId: number) => void;
  logout: () => void;
}

type UserContextState = {
  isLoggedIn: boolean;
  memberId: number | null;
};

interface UserProvideProps {
  initialData: UserContextState | undefined;
}

const UserContext = createContext<UserContextType>(null!);

const UserProvider = ({
  children,
  initialData = {
    isLoggedIn: false,
    memberId: null,
  },
}: PropsWithChildren<UserProvideProps>) => {
  const [isLoggedIn, setIsLoggedIn] = useState(initialData.isLoggedIn);
  const [memberId, setMemberId] = useState<number | null>(initialData.memberId);

  const login = (accessToken: string, memberId: number) => {
    setAppClientHeaderAuthorization(accessToken);
    setCookie(COOKIE_KEY.ACCESS_TOKEN, accessToken);
    setIsLoggedIn(true);
    setMemberId(memberId);
  };

  const logout = () => {
    setAppClientHeaderAuthorization("");
    deleteCookie(COOKIE_KEY.ACCESS_TOKEN);
    setIsLoggedIn(false);
    setMemberId(null);
  };

  const value = { isLoggedIn, login, logout, memberId };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
