import React, { useState } from "react";
import styled from "@emotion/styled";

import useAutoCompleteInput from "@/hooks/useAutoCompleteInput";
import useReadTeamMembers from "@/pages/RollingpaperCreationPage/hooks/useReadTeamMembers";

import Button from "@/components/Button";
import AutoCompleteInput from "@/components/AutoCompleteInput";
import StepLayout from "@/pages/RollingpaperCreationPage/components/StepLayout";
import RecipientBox from "@/pages/RollingpaperCreationPage/components/RecipientBox";

import { RECIPIENT } from "@/constants";

import { Recipient, Team, TeamMember } from "@/types";
import { GetTeamMembersResponse } from "@/types/apiResponse";

interface Step2Props {
  teamId: Team["id"] | null;
  onSelectRecipient: (recipient: Recipient) => void;
  onSelectMember: (memberId: TeamMember["id"]) => void;
  selected: Recipient | null;
}

interface StyledShowProps {
  isShown: boolean;
}

const Step2 = ({
  teamId,
  onSelectRecipient,
  onSelectMember,
  selected,
}: Step2Props) => {
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

  const { data: teamMemberResponse } = useReadTeamMembers({
    teamId: teamId!,
    onSuccess: handleReadTeamMembersSuccess,
  });

  const findReceiverWithNickName = (nickname: string) => {
    return teamMemberResponse?.members.find(
      (member) => member.nickname === nickname
    );
  };

  const isValidReceiverNickName = (nickname: string) => {
    const receiver = findReceiverWithNickName(nickname);
    return !!receiver;
  };

  const handleTeamClick = () => {
    onSelectRecipient(RECIPIENT.TEAM);
  };

  const handleMemberClick = () => {
    onSelectRecipient(RECIPIENT.MEMBER);
    setIsToShown(true);
    setIsRecipeinetShown(false);
  };

  const handleRollingpaperToSubmit = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const memeberInfo = findReceiverWithNickName(rollingpaperTo);

    if (!memeberInfo) {
      return;
    }

    onSelectMember(memeberInfo.id);
  };

  return (
    <StepLayout title="롤링페이퍼 대상을 선택해주세요">
      <StyledMain>
        <StyleShow isShown={isRecipeinetShown}>
          <StyleRecipientContainer>
            <RecipientBox
              type={RECIPIENT.TEAM}
              onClick={handleTeamClick}
              selected={selected === RECIPIENT.TEAM}
            />
            <RecipientBox
              type={RECIPIENT.MEMBER}
              onClick={handleMemberClick}
              selected={selected === RECIPIENT.MEMBER}
            />
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
    </StepLayout>
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

  flex-direction: column;

  @media only screen and (min-width: 960px) {
    flex-direction: row;
  }
`;

const StyleForm = styled.form`
  display: flex;
  flex-direction: column;

  gap: 160px;

  width: 300px;
`;

export default Step2;
