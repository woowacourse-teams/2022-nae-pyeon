import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import axios from "axios";

import PageTitleWithBackButton from "@/components/PageTitleWithBackButton";
import LabeledInput from "@/components/LabeledInput";
import AutoCompleteInput from "@/components/AutoCompleteInput";
import Button from "@/components/Button";

import { Rollingpaper, CustomError } from "@/types";
import { REGEX } from "@/constants";

import useAutoCompleteInput from "@/hooks/useAutoCompleteInput";
import useInput from "@/hooks/useInput";

import { getTeamMembers } from "@/api/team";
import { postRollingpaper } from "@/api/rollingpaper";
import useParamValidate from "@/hooks/useParamValidate";

interface TeamMemberResponse {
  members: TeamMember[];
}

interface TeamMember {
  id: number;
  nickname: string;
}

const RollingpaperCreationPage = () => {
  const navigate = useNavigate();
  const { teamId } = useParamValidate(["teamId"]);
  const {
    value: rollingpaperTitle,
    handleInputChange: handleRollingpaperTitleChange,
  } = useInput("");
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

  const {
    isLoading,
    isError,
    data: teamMemberResponse,
  } = useQuery<TeamMemberResponse>(["team-member", teamId], () =>
    getTeamMembers(+teamId)
  );

  const { mutate: postNewRollingpaper } = useMutation(
    ({
      title,
      addresseeId,
    }: Pick<Rollingpaper, "title"> & { addresseeId: number }) =>
      postRollingpaper({ teamId: +teamId, title, addresseeId }),
    {
      onSuccess: (data) => {
        const { id: newRollingpaperId } = data;
        navigate(`/team/${teamId}/rollingpaper/${newRollingpaperId}`, {
          replace: true,
        });
      },
      onError: (error) => {
        if (axios.isAxiosError(error) && error.response) {
          const customError = error.response.data as CustomError;
          alert(customError.message);
        }
      },
    }
  );

  const findReceiverWithNickName = (nickName: string) => {
    return teamMemberResponse?.members.find(
      (member) => member.nickname === nickName
    );
  };

  const isValidRollingpaperTitle = (title: string) => {
    return REGEX.ROLLINGPAPER_TITLE.test(title);
  };

  const isValidReceiverNickName = (nickName: string) => {
    const receiver = findReceiverWithNickName(nickName);
    return !!receiver;
  };

  const handleRollingpaperFormSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!isValidRollingpaperTitle(rollingpaperTitle)) {
      return alert("롤링페이퍼 제목은 1 ~ 20자여야 합니다.");
    }

    const receiver = findReceiverWithNickName(rollingpaperTo);
    if (!receiver) {
      return alert("받는 사람은 모임원 중 한 명이어야 합니다.");
    }

    postNewRollingpaper({ title: rollingpaperTitle, addresseeId: receiver.id });
  };

  if (isLoading) {
    return <div>로딩 중</div>;
  }
  if (isError || !teamMemberResponse) {
    return <div>에러</div>;
  }

  return (
    <>
      <PageTitleWithBackButton>롤링페이퍼 만들기</PageTitleWithBackButton>
      <StyledForm onSubmit={handleRollingpaperFormSubmit}>
        <LabeledInput
          labelText="롤링페이퍼 제목"
          value={rollingpaperTitle}
          pattern={REGEX.ROLLINGPAPER_TITLE.source}
          onChange={handleRollingpaperTitleChange}
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
            !isValidRollingpaperTitle(rollingpaperTitle) ||
            !isValidReceiverNickName(rollingpaperTo)
          }
        >
          완료
        </Button>
      </StyledForm>
    </>
  );
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  button {
    align-self: flex-end;
  }
`;

export default RollingpaperCreationPage;
