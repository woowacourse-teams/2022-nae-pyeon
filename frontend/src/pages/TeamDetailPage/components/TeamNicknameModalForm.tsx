import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import styled from "@emotion/styled";

import { appClient, queryClient } from "@/api";

import LineButton from "@/components/LineButton";
import Modal from "@/components/Modal";
import UnderlineInput from "@/components/UnderlineInput";

import { REGEX } from "@/constants";
import { useSnackbar } from "@/context/SnackbarContext";

interface TeamJoinModalFormProp {
  onClickCloseButton: () => void;
  mode: string;
}

interface TeamJoinFormInfo {
  nickname: string;
}

const MODE = {
  JOIN: "join",
  EDIT: "edit",
} as const;

const TeamNicknameModalForm = ({
  onClickCloseButton,
  mode,
}: TeamJoinModalFormProp) => {
  const { openSnackbar } = useSnackbar();
  const { teamId } = useParams();
  const [nickname, setNickname] = useState("");

  const { mutate: joinTeam } = useMutation(
    async ({ nickname }: TeamJoinFormInfo) => {
      const response = await appClient.post(`/teams/${teamId}`, { nickname });
      return response.data;
    },
    {
      onSuccess: () => {
        onClickCloseButton();
        openSnackbar("모임 가입 완료");
        queryClient.refetchQueries(["team", teamId]);
        queryClient.refetchQueries(["rollingpaperList", teamId]);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const { mutate: editTeamNickname } = useMutation(
    async ({ nickname }: TeamJoinFormInfo) => {
      const response = await appClient.put(`/teams/${teamId}/me`, { nickname });
      return response.data;
    },
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

  const handleTeamJoinSubmit =
    (mode: string): React.FormEventHandler<HTMLFormElement> =>
    (e) => {
      e.preventDefault();

      if (!REGEX.TEAM_NICKNAME.test(nickname)) {
        alert("1~20자 사이의 값을 입력해주세요");
        return;
      }

      if (mode === MODE.JOIN) {
        joinTeam({ nickname });
      }

      if (mode === MODE.EDIT) {
        editTeamNickname({ nickname });
      }
    };

  return (
    <Modal onClickCloseButton={onClickCloseButton}>
      <StyledJoinForm onSubmit={handleTeamJoinSubmit(mode)}>
        <p>모임에서 사용할 닉네임을 입력해주세요. (2 ~ 20자)</p>
        <UnderlineInput
          value={nickname}
          setValue={setNickname}
          pattern={REGEX.TEAM_NICKNAME.source}
          errorMessage="1~20자 사이의 값을 입력해주세요"
        />
        {mode === MODE.JOIN && (
          <LineButton type="submit">모임 가입하기</LineButton>
        )}
        {mode === MODE.EDIT && <LineButton type="submit">수정하기</LineButton>}
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

export default TeamNicknameModalForm;
