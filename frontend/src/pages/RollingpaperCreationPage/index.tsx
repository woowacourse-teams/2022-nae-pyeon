import React, { useState } from "react";
import styled from "@emotion/styled";

import { RecipientBox } from "@/pages/RollingpaperCreationPage/components/RecipientBox";
import TeamRollingpaperCreateForm from "@/pages/RollingpaperCreationPage/components/TeamRollingpaperCreateForm";
import MemberRollingpaperCreateForm from "@/pages/RollingpaperCreationPage/components/MemberRollingpaperCreateForm";

type RecipientType = "team" | "member";

const RollingpaperCreationPage = () => {
  const [recipient, setRecipient] = useState<RecipientType | null>(null);

  const handleTeamRollingpaperCreateClick = () => {
    setRecipient("team");
  };

  const handleMemberRollingpaperCreateClick = () => {
    setRecipient("member");
  };

  if (recipient === "team") {
    return (
      <StyledMain>
        <TeamRollingpaperCreateForm />
      </StyledMain>
    );
  }

  if (recipient === "member") {
    return (
      <StyledMain>
        <MemberRollingpaperCreateForm />
      </StyledMain>
    );
  }

  return (
    <StyledMain>
      <RecipientBox type="team" onClick={handleTeamRollingpaperCreateClick} />
      <RecipientBox
        type="member"
        onClick={handleMemberRollingpaperCreateClick}
      />
    </StyledMain>
  );
};

const StyledMain = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  height: 100vh;
`;

export default RollingpaperCreationPage;
