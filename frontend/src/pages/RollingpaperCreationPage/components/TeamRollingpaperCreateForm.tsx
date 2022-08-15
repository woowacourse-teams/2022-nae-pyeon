import React from "react";
import styled from "@emotion/styled";

import LabeledInput from "@/components/LabeledInput";
import Button from "@/components/Button";

import { REGEX } from "@/constants";

const TeamRollingpaperCreateForm = () => {
  const handleRollingpaperCreateSubmit: React.FormEventHandler<
    HTMLFormElement
  > = () => {
    console.log("생성되었음");
  };

  return (
    <StyledMain>
      <StyledHeader>모임에게 롤링페이퍼 작성</StyledHeader>
      <StyledForm onSubmit={handleRollingpaperCreateSubmit}>
        <LabeledInput
          labelText="롤링페이퍼 제목"
          pattern={REGEX.ROLLINGPAPER_TITLE.source}
        />
        <Button>완료</Button>
      </StyledForm>
    </StyledMain>
  );
};

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  gap: 80px;

  width: 100%;
`;

const StyledHeader = styled.h1`
  font-size: 28px;
  font-weight: 600;

  align-self: center;
`;

const StyledForm = styled.form`
  width: 100%;
  button {
    margin-top: 60px;
  }
`;

export default TeamRollingpaperCreateForm;
