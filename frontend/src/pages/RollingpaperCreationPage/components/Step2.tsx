import React, { forwardRef, useState } from "react";
import styled from "@emotion/styled";

import useAutoCompleteInput from "@/hooks/useAutoCompleteInput";

import Button from "@/components/Button";
import AutoCompleteInput from "@/components/AutoCompleteInput";

import useReadTeamMembers from "@/pages/RollingpaperCreationPage/hooks/useReadTeamMembers";

import StepTitleWithLayout from "@/pages/RollingpaperCreationPage/components/StepTitleWithLayout";
import RecipientBox from "@/pages/RollingpaperCreationPage/components/RecipientBox";

import { Recipient, Team, TeamMember } from "@/types";
import { GetTeamMembersResponse } from "@/types/apiResponse";

import { RECIPIENT } from "@/constants";

interface Step2Props {
  teamId: Team["id"] | null;
  onClick: (recipient: Recipient, to?: TeamMember["id"]) => void;
}

interface StyledShowProps {
  isShown: boolean;
}

const Step2 = (
  { teamId, onClick }: Step2Props,
  ref: React.Ref<HTMLDivElement>
) => {
  const [isToShown, setIsToShown] = useState(false);
  const [isRecipeinetShown, setIsRecipeinetShown] = useState(true);
  const {
    value: rollingpaperTo,
    autoCompleteList,
    isOpen,
    ref: autoCompleteRef,
    handleAutoInputChange,
    handleAutoInputFocus,
    handleListItemClick,
    setKeywordList,
  } = useAutoCompleteInput();

  const handleReadTeamMembersSuccess = (data: GetTeamMembersResponse) => {
    setKeywordList(data.members.map((member) => member.nickname));
  };

  const { data: teamMemberResponse } = useReadTeamMembers(
    teamId,
    handleReadTeamMembersSuccess
  );

  const findReceiverWithNickName = (nickname: string) => {
    return teamMemberResponse?.members.find(
      (member) => member.nickname === nickname
    ) as TeamMember;
  };

  const isValidReceiverNickName = (nickname: string) => {
    const receiver = findReceiverWithNickName(nickname);
    return !!receiver;
  };

  const handleTeamClick = () => {
    onClick(RECIPIENT.TEAM);
  };

  const handleMemberClick = () => {
    setIsToShown(true);
    setIsRecipeinetShown(false);
  };

  const handleRollingpaperToSubmit = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    onClick(RECIPIENT.MEMBER, findReceiverWithNickName(rollingpaperTo).id);
  };

  return (
    <StepTitleWithLayout title="롤링페이퍼 대상을 선택해주세요" ref={ref}>
      <StyledMain>
        <StyleShow isShown={isRecipeinetShown}>
          <StyleRecipientContainer>
            <RecipientBox type={RECIPIENT.TEAM} onClick={handleTeamClick} />
            <RecipientBox type={RECIPIENT.MEMBER} onClick={handleMemberClick} />
          </StyleRecipientContainer>
        </StyleShow>
        <StyleShow isShown={isToShown}>
          <StyleForm>
            <AutoCompleteInput
              labelText="받는 사람"
              value={rollingpaperTo}
              autoCompleteList={autoCompleteList}
              isOpen={isOpen}
              ref={autoCompleteRef}
              onChange={handleAutoInputChange}
              onFocus={handleAutoInputFocus}
              onClickListItem={handleListItemClick}
            />
            <Button
              type="submit"
              onClick={handleRollingpaperToSubmit}
              disabled={!isValidReceiverNickName(rollingpaperTo)}
            >
              확인
            </Button>
          </StyleForm>
        </StyleShow>
      </StyledMain>
    </StepTitleWithLayout>
  );
};

const StyledMain = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
`;

const StyleShow = styled.div<StyledShowProps>`
  display: ${(props) => (props.isShown ? "block" : "none")};
`;

const StyleRecipientContainer = styled.div`
  display: flex;
  gap: 12px;
`;

const StyleForm = styled.form`
  display: flex;
  flex-direction: column;

  gap: 160px;

  width: 300px;
`;

export default forwardRef(Step2);
