import React from "react";
import styled from "@emotion/styled";

import LabeledInput from "@/components/LabeledInput";
import Button from "@/components/Button";
import AutoCompleteInput from "@/components/AutoCompleteInput";

import { REGEX } from "@/constants";
import useParamValidate from "@/hooks/useParamValidate";
import useAutoCompleteInput from "@/hooks/useAutoCompleteInput";
import useInput from "@/hooks/useInput";

import useReadTeamMembers from "@/pages/RollingpaperCreationPage/hooks/useReadTeamMembers";
import useCreateMemberRollingpaper from "@/pages/RollingpaperCreationPage/hooks/useCreateMemberRolliingpaper";

const MemberRollingpaperCreateForm = () => {
  const { value: title, handleInputChange } = useInput("");
  const { teamId } = useParamValidate(["teamId"]);

  const {
    value: rollingpaperTo,
    autoCompleteList,
    isOpen,
    ref,
    handleAutoInputChange,
    handleAutoInputFocus,
    handleListItemClick,
    setKeywordList,
  } = useAutoCompleteInput();

  const createMemberRollingpaper = useCreateMemberRollingpaper(+teamId);

  const { data: teamMemberResponse } = useReadTeamMembers({
    teamId: +teamId,
    onSuccess: (data) =>
      setKeywordList(data.members.map((member) => member.nickname)),
  });

  const findReceiverWithNickName = (nickName: string) => {
    return teamMemberResponse?.members.find(
      (member) => member.nickname === nickName
    );
  };

  const isValidReceiverNickName = (nickName: string) => {
    const receiver = findReceiverWithNickName(nickName);
    return !!receiver;
  };

  const isValidRollingpaperTitle = (title: string) => {
    return REGEX.ROLLINGPAPER_TITLE.test(title);
  };

  const handleRollingpaperCreateSubmit: React.FormEventHandler<
    HTMLFormElement
  > = (e) => {
    e.preventDefault();

    if (!isValidRollingpaperTitle(title)) {
      return alert("롤링페이퍼 제목은 1 ~ 20자여야 합니다.");
    }

    const receiver = findReceiverWithNickName(rollingpaperTo);
    if (!receiver) {
      return alert("받는 사람은 모임원 중 한 명이어야 합니다.");
    }

    createMemberRollingpaper({ title, addresseeId: receiver.id });
  };

  return (
    <StyledMain>
      <StyledHeader>맴버에게 롤링페이퍼 작성</StyledHeader>
      <StyledForm onSubmit={handleRollingpaperCreateSubmit}>
        <LabeledInput
          labelText="롤링페이퍼 제목"
          pattern={REGEX.ROLLINGPAPER_TITLE.source}
          value={title}
          onChange={handleInputChange}
        />
        <AutoCompleteInput
          labelText="받는 사람"
          value={rollingpaperTo}
          autoCompleteList={autoCompleteList}
          isOpen={isOpen}
          ref={ref}
          onChange={handleAutoInputChange}
          onFocus={handleAutoInputFocus}
          onClickListItem={handleListItemClick}
        />
        <Button
          type="submit"
          disabled={
            !isValidRollingpaperTitle(title) ||
            !isValidReceiverNickName(rollingpaperTo)
          }
        >
          완료
        </Button>
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

export default MemberRollingpaperCreateForm;
