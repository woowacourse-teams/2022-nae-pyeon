import { useState, createContext, PropsWithChildren } from "react";

import useCreateLogout from "@/hooks/useCreateLogout";

import { setAppClientHeaderAuthorization } from "@/api";
import { deleteCookie, getCookie, setCookie } from "@/util/cookie";
import { COOKIE_KEY, TOKEN_MAX_AGE } from "@/constants";

interface LoginProps {
  accessToken: string;
  refreshToken: string;
  memberId: number;
}

interface UserContextType {
  isLoggedIn: boolean;
  memberId: number | null;
  login: ({ accessToken, refreshToken, memberId }: LoginProps) => void;
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

  const logoutRefreshToken = useCreateLogout();

  const login = ({ accessToken, refreshToken, memberId }: LoginProps) => {
    setAppClientHeaderAuthorization(accessToken);
    setCookie({
      name: COOKIE_KEY.ACCESS_TOKEN,
      value: accessToken,
      maxAge: TOKEN_MAX_AGE.ACCESS_TOKEN,
    });
    setCookie({
      name: COOKIE_KEY.REFRESH_TOKEN,
      value: refreshToken,
      maxAge: TOKEN_MAX_AGE.REFRESH_TOKEN,
    });
    setIsLoggedIn(true);
    setMemberId(memberId);
  };

  const logout = () => {
    const refreshToken = getCookie(COOKIE_KEY.REFRESH_TOKEN)!;

    logoutRefreshToken(refreshToken);
    setAppClientHeaderAuthorization("");
    deleteCookie(COOKIE_KEY.ACCESS_TOKEN);
    deleteCookie(COOKIE_KEY.REFRESH_TOKEN);
    setIsLoggedIn(false);
    setMemberId(null);
  };

  const value = { isLoggedIn, login, logout, memberId };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
