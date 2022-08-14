import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "@/context/UserContext";

import { Team } from "@/types";

type useCheckInviteLinkAccessibilityArgs = {
  inviteToken: string;
};

const useCheckInviteLinkAccessibility = ({
  inviteToken,
}: useCheckInviteLinkAccessibilityArgs) => {
  const navigate = useNavigate();

  const { isLoggedIn } = useContext(UserContext);

  const checkAccessibility = (teamDetail: Team | undefined) => {
    if (!isLoggedIn) {
      navigate("/login", {
        replace: true,
        state: { inviteToken },
      });
    }

    if (teamDetail && teamDetail.joined) {
      navigate(`/team/${teamDetail.id}`, {
        replace: true,
      });
    }
  };

  return checkAccessibility;
};

export default useCheckInviteLinkAccessibility;
