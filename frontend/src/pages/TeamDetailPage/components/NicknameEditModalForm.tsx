import React from "react";
import styled from "@emotion/styled";

import LineButton from "@/components/LineButton";
import Modal from "@/components/Modal";
import UnderlineInput from "@/components/UnderlineInput";

import useValidatedParam from "@/hooks/useValidatedParam";
import useInput from "@/hooks/useInput";

import { REGEX } from "@/constants";

import useReadTeamNickname from "@/pages/TeamDetailPage/hooks/useReadTeamNickname";
import useUpdateTeamNickname from "../hooks/useUpdateTeamNickname";

interface NicknameEditModalForm {
  onClickCloseButton: () => void;
}

const NicknameEditModalForm = ({
  onClickCloseButton,
}: NicknameEditModalForm) => {
  const teamId = useValidatedParam<number>("teamId");
  const updateTeamNickname = useUpdateTeamNickname(onClickCloseButton);

  const { data: teamNicknameResponse } = useReadTeamNickname(teamId);

  const { value: nickname, handleInputChange: handleNicknameChange } = useInput(
    teamNicknameResponse?.nickname || ""
  );

  const handleTeamJoinSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!REGEX.TEAM_NICKNAME.test(nickname)) {
      alert("1 ~ 20자 사이의 닉네임을 입력해주세요");
      return;
    }
    updateTeamNickname(nickname);
  };

  return (
    <Modal onClickCloseButton={onClickCloseButton}>
      <StyledJoinForm onSubmit={handleTeamJoinSubmit}>
        <p>모임에서 사용할 닉네임을 입력해주세요. (1 ~ 20자)</p>
        <UnderlineInput
          value={nickname}
          pattern={REGEX.TEAM_NICKNAME.source}
          errorMessage="1 ~ 20자 사이의 닉네임을 입력해주세요"
          onChange={handleNicknameChange}
        />
        <LineButton type="submit">수정하기</LineButton>
      </StyledJoinForm>
    </Modal>
  );
};

const StyledJoinForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100%;

  p {
    margin: 20px 0 100px;
  }

  button {
    margin-top: 8px;
  }
`;

export default NicknameEditModalForm;
