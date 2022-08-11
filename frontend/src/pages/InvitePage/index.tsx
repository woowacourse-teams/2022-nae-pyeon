import React, { useState } from "react";
import styled from "@emotion/styled";

import UnderlineInput from "@/components/UnderlineInput";
import LineButton from "@/components/LineButton";

import { REGEX } from "@/constants";
import TeamDescriptionBox from "@/pages/InvitePage/components/TeamDescriptionBox";
import useInput from "@/hooks/useInput";

const InvitePage = () => {
  const { value: nickname, handleInputChange } = useInput("");

  const handleTeamJoinSubmit = () => {
    console.log("team join logic");
  };

  return (
    <StyledPage>
      <TeamDescriptionBox
        color="#98DAFF"
        emoji="❤️"
        name="우테코 4기"
        description="설명입니다 설명입니다"
      />
      <StyledJoinForm onSubmit={handleTeamJoinSubmit}>
        <p>모임에서 사용할 닉네임을 입력해주세요. (1 ~ 20자)</p>
        <UnderlineInput
          value={nickname}
          pattern={REGEX.TEAM_NICKNAME.source}
          errorMessage="1 ~ 20자 사이의 닉네임을 입력해주세요"
          onChange={handleInputChange}
        />
        <LineButton type="submit">모임 가입하기</LineButton>
      </StyledJoinForm>
    </StyledPage>
  );
};

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;

  height: 100vh;
  padding-top: 40px;
`;

const StyledJoinForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 90%;

  p {
    margin: 20px 0 100px;
  }

  button {
    margin-top: 8px;
  }
`;

export default InvitePage;
