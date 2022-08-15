import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { useSnackbar } from "@/context/SnackbarContext";
import { UserContext } from "@/context/UserContext";

import { Team } from "@/types";

type useCheckInviteLinkAccessibilityArgs = {
  inviteToken: string;
};

const useCheckInviteLinkAccessibility = ({
  inviteToken,
}: useCheckInviteLinkAccessibilityArgs) => {
  const navigate = useNavigate();

  const { openSnackbar } = useSnackbar();
  const { isLoggedIn } = useContext(UserContext);

  const checkAccessibility = (teamDetail: Team | undefined) => {
    if (!isLoggedIn) {
      openSnackbar("로그인이 필요한 서비스입니다.");
      navigate("/login", {
        replace: true,
        state: { inviteToken },
      });
    }

    if (teamDetail && teamDetail.joined) {
      openSnackbar("이미 가입한 모임입니다.");
      navigate(`/team/${teamDetail.id}`, {
        replace: true,
      });
    }
  };

  return checkAccessibility;
};

export default useCheckInviteLinkAccessibility;
