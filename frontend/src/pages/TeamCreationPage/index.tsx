import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import styled from "@emotion/styled";

import useInput from "@/hooks/useInput";

import LabeledInput from "@/components/LabeledInput";
import LabeledRadio from "@/components/LabeledRadio";
import LabeledTextArea from "@/components/LabeledTextArea";
import Button from "@/components/Button";
import PageTitleWithBackButton from "@/components/PageTitleWithBackButton";

import { COLORS, REGEX } from "@/constants";
import { CustomError } from "@/types";
import { postTeam } from "@/api/team";

import LabeledSwitch from "@/pages/TeamCreationPage/components/LabeledSwitch";
import useSwitch from "@/pages/TeamCreationPage/hooks/useSwitch";

const emojis = [
  { id: 1, value: "🐶" },
  { id: 2, value: "❤️" },
  { id: 3, value: "👍" },
  { id: 4, value: "✏️" },
  { id: 5, value: "🏃‍♀️" },
  { id: 6, value: "☕️" },
];

const colors = Object.values(COLORS).map((value, index) => ({
  backgroundColor: value,
  id: index,
}));

const TeamCreationPage = () => {
  const [teamDescription, setTeamDescription] = useState("");
  const [emoji, setEmoji] = useState("");
  const [color, setColor] = useState("");
  const { value: teamName, handleInputChange: handleTeamNameChange } =
    useInput("");
  const { value: nickname, handleInputChange: handleNicknameChange } =
    useInput("");

  const navigate = useNavigate();
  const { isChecked: isPrivateTeam, handleSwitchClick } = useSwitch();

  const { mutate: createTeam } = useMutation(
    () => {
      return postTeam({
        name: teamName,
        description: teamDescription,
        emoji,
        color,
        nickname,
      });
    },
    {
      onSuccess: () => {
        navigate("/");
      },
      onError: (error) => {
        if (axios.isAxiosError(error) && error.response) {
          const customError = error.response.data as CustomError;
          alert(customError.message);
        }
      },
    }
  );

  const handleTeamCreationSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!REGEX.TEAM_NAME.test(nickname)) {
      return alert("모임명을 입력해주세요");
    }
    if (!teamDescription) {
      return alert("모임 설명을 입력해주세요");
    }
    if (!REGEX.USERNAME.test(nickname)) {
      return alert("올바르지 않은 닉네임 형식입니다");
    }
    if (!emoji) {
      return alert("이모지를 선택해주세요");
    }
    if (!color) {
      return alert("모임 색상을 선택해주세요");
    }

    createTeam();
  };

  return (
    <>
      <PageTitleWithBackButton>모임 추가하기</PageTitleWithBackButton>
      <StyledForm>
        <LabeledInput
          labelText="모임명"
          value={teamName}
          pattern={REGEX.TEAM_NAME.source}
          onChange={handleTeamNameChange}
          errorMessage={"1~20자 사이의 모임명을 입력해주세요"}
        />
        <LabeledTextArea
          labelText="모임 설명"
          value={teamDescription}
          setValue={setTeamDescription}
          minLength={1}
          maxLength={100}
          placeholder="최대 100자까지 입력 가능합니다"
        />
        <LabeledInput
          labelText="나의 닉네임"
          value={nickname}
          pattern={REGEX.USERNAME.source}
          onChange={handleNicknameChange}
          errorMessage={"2~20자 사이의 닉네임을 입력해주세요"}
        />
        <LabeledRadio
          labelText="모임을 표현하는 이모지를 선택해주세요"
          radios={emojis}
          onClickRadio={setEmoji}
        />
        <LabeledRadio
          labelText="모임을 표현하는 색상을 선택해주세요"
          radios={colors}
          onClickRadio={setColor}
        />
        <LabeledSwitch
          labelText="비공개로 만들기"
          isChecked={isPrivateTeam}
          onClick={handleSwitchClick}
        />
        <Button
          type="submit"
          onClick={handleTeamCreationSubmit}
          disabled={
            !(
              REGEX.TEAM_NAME.test(nickname) &&
              teamDescription &&
              REGEX.USERNAME.test(nickname) &&
              emoji &&
              color
            )
          }
        >
          확인
        </Button>
      </StyledForm>
    </>
  );
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;

  padding-bottom: 20px;

  fieldset {
    margin-bottom: 20px;
  }
`;
export default TeamCreationPage;
