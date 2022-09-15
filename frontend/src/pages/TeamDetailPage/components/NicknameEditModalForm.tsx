import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import styled from "@emotion/styled";

import { queryClient } from "@/api";

import LineButton from "@/components/LineButton";
import Modal from "@/components/Modal";
import UnderlineInput from "@/components/UnderlineInput";

import useValidatedParam from "@/hooks/useValidatedParam";
import useInput from "@/hooks/useInput";

import { REGEX } from "@/constants";
import { useSnackbar } from "@/context/SnackbarContext";

import { putTeamNickname, getTeamMyNickname } from "@/api/team";
import { Team } from "@/types";

interface NicknameEditModalForm {
  onClickCloseButton: () => void;
}

const NicknameEditModalForm = ({
  onClickCloseButton,
}: NicknameEditModalForm) => {
  const { openSnackbar } = useSnackbar();
  const teamId = useValidatedParam<number>("teamId");

  const { data: teamNicknameResponse } = useQuery<Pick<Team, "nickname">>(
    ["team-nickname", teamId],
    () => getTeamMyNickname(teamId)
  );

  const { value: nickname, handleInputChange: handleNicknameChange } = useInput(
    teamNicknameResponse?.nickname || ""
  );

  const { mutate: editTeamNickname } = useMutation(
    async (nickname: string) => putTeamNickname({ id: teamId, nickname }),
    {
      onSuccess: () => {
        onClickCloseButton();
        openSnackbar("닉네임 수정 완료");
        queryClient.refetchQueries(["team", teamId]);
        queryClient.refetchQueries(["rollingpaperList", teamId]);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const handleTeamJoinSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!REGEX.TEAM_NICKNAME.test(nickname)) {
      alert("1 ~ 20자 사이의 닉네임을 입력해주세요");
      return;
    }
    editTeamNickname(nickname);
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
