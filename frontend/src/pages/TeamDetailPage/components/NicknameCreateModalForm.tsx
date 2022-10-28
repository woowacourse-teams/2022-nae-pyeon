import React from "react";
import styled from "@emotion/styled";

import useInput from "@/hooks/useInput";
import useValidateParam from "@/hooks/useValidateParam";
import { useCreateTeamMember } from "@/hooks/api/team";

import LineButton from "@/components/LineButton";
import Modal from "@/components/Modal";
import UnderlineInput from "@/components/UnderlineInput";

import { REGEX } from "@/constants";

import { Team } from "@/types";

interface NicknameCreateModalFormProps {
  onClickCloseButton: () => void;
}

const NicknameCreateModalForm = ({
  onClickCloseButton,
}: NicknameCreateModalFormProps) => {
  const { value: nickname, handleInputChange: handleNicknameChange } =
    useInput("");
  const { mutate: createTeamMember } = useCreateTeamMember({
    onSuccess: onClickCloseButton,
  });
  const teamId = useValidateParam<Team["id"]>("teamId");

  const handleTeamJoinSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!REGEX.TEAM_NICKNAME.test(nickname)) {
      alert("1 ~ 20자 사이의 닉네임을 입력해주세요");
      return;
    }

    createTeamMember({ id: teamId, nickname });
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
        <LineButton type="submit">모임 가입하기</LineButton>
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

export default NicknameCreateModalForm;
