import { useState, createContext, PropsWithChildren } from "react";

import { setAppClientHeaderAuthorization } from "@/api";
import { deleteCookie, setCookie } from "@/util/cookie";
import { COOKIE_KEY } from "@/constants";

interface loginProps {
  accessToken: string;
  refreshToken: string;
  memberId: number;
}

interface UserContextType {
  isLoggedIn: boolean;
  memberId: number | null;
  login: ({ accessToken, refreshToken, memberId }: loginProps) => void;
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

  const login = ({ accessToken, refreshToken, memberId }: loginProps) => {
    setAppClientHeaderAuthorization(accessToken);
    setCookie({
      name: COOKIE_KEY.ACCESS_TOKEN,
      value: accessToken,
      maxAge: 1800,
    });
    setCookie({
      name: COOKIE_KEY.REFRESH_TOKEN,
      value: refreshToken,
      maxAge: 604800,
    });
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
