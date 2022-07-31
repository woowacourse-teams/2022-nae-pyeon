import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import styled from "@emotion/styled";

import appClient from "@/api";

import LineButton from "@/components/LineButton";
import Modal from "@/components/Modal";
import UnderlineInput from "@/components/UnderlineInput";

import { REGEX } from "@/constants";

interface TeamJoinModalFormProp {
  onClickCloseButton: React.MouseEventHandler<HTMLButtonElement>;
}

interface TeamJoinFormInfo {
  nickname: string;
}

const TeamJoinModalForm = ({ onClickCloseButton }: TeamJoinModalFormProp) => {
  const navigate = useNavigate();
  const { teamId } = useParams();
  const [nickname, setNickname] = useState("");

  const { mutate: joinTeam } = useMutation(
    async ({ nickname }: TeamJoinFormInfo) => {
      const response = await appClient.post(`/teams/${teamId}`, { nickname });
      return response.data;
    },
    {
      onSuccess: () => {
        alert("가입 성공!");
        navigate(0);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const handleTeamJoinSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!REGEX.USERNAME.test(nickname)) {
      alert("닉네임은 한글, 영어, 숫자만 가능합니다.");
      return;
    }

    joinTeam({ nickname });
  };

  return (
    <Modal onClickCloseButton={onClickCloseButton}>
      <StyledJoinForm onSubmit={handleTeamJoinSubmit}>
        <p>모임에서 사용할 닉네임을 입력해주세요. (2 ~ 20자)</p>
        <UnderlineInput
          value={nickname}
          setValue={setNickname}
          pattern={REGEX.USERNAME.source}
          errorMessage="한글, 영어, 숫자 / 2 ~ 20자"
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

export default TeamJoinModalForm;
