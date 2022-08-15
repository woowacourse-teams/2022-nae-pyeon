import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { useSnackbar } from "@/context/SnackbarContext";
import { UserContext } from "@/context/UserContext";

type useCheckLoginArgs = {
  inviteToken: string;
};

const useCheckLogin = ({ inviteToken }: useCheckLoginArgs) => {
  const navigate = useNavigate();

  const { openSnackbar } = useSnackbar();
  const { isLoggedIn } = useContext(UserContext);

  const checkLogin = () => {
    if (!isLoggedIn) {
      openSnackbar("로그인이 필요한 서비스입니다.");
      navigate("/login", {
        replace: true,
        state: { inviteToken },
      });
    }
  };

  return checkLogin;
};

export default useCheckLogin;
