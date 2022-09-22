import React from "react";
import styled from "@emotion/styled";

import LabeledInput from "@/components/LabeledInput";
import Button from "@/components/Button";
import AutoCompleteInput from "@/components/AutoCompleteInput";

import { REGEX } from "@/constants";
import useValidatedParam from "@/hooks/useValidatedParam";
import useAutoCompleteInput from "@/hooks/useAutoCompleteInput";
import useInput from "@/hooks/useInput";

import useReadTeamMembers from "@/pages/RollingpaperCreationPage/hooks/useReadTeamMembers";
import useCreateMemberRollingpaper from "@/pages/RollingpaperCreationPage/hooks/useCreateMemberRolliingpaper";

const MemberRollingpaperCreateForm = () => {
  const teamId = useValidatedParam<number>("teamId");
  const { value: title, handleInputChange } = useInput("");
  const {
    value: rollingpaperTo,
    autoCompleteList,
    isOpen,
    ref,
    handleAutoInputChange,
    handleAutoInputFocus,
    handleListItemClick,
  } = useAutoCompleteInput();

  const createMemberRollingpaper = useCreateMemberRollingpaper(teamId);

  // 이런 경우에는 컴포넌트 단에서 onSuccess를 처리하는 것이 편할듯
  // 다른 커스텀 훅의 호출이 필요한 경우
  const { data: teamMemberResponse } = useReadTeamMembers(teamId);

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
          errorMessage={"1~20자 사이의 제목을 입력해주세요"}
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
