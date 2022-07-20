import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import axios from "axios";
import styled from "@emotion/styled";

import appClient from "@/api";

import LabeledInput from "@/components/LabeledInput";
import LabeledRadio from "@/components/LabeledRadio";
import LabeledTextArea from "@/components/LabeledTextArea";
import Button from "@/components/Button";
import PageTitleWithBackButton from "@/components/PageTitleWithBackButton";
import RequireLogin from "@/components/RequireLogin";

import { REGEX } from "@/constants";
import { CustomError } from "@/types";

const emojis = [
  { id: 1, value: "🐶" },
  { id: 2, value: "❤️" },
  { id: 3, value: "👍" },
  { id: 4, value: "✏️" },
  { id: 5, value: "🏃‍♀️" },
  { id: 6, value: "☕️" },
];

const colors = [
  { id: 1, backgroundColor: "#C5FF98" },
  { id: 2, backgroundColor: "#FF8181" },
  { id: 3, backgroundColor: "#FFF598" },
  { id: 4, backgroundColor: "#98DAFF" },
  { id: 5, backgroundColor: "#98A2FF" },
  { id: 6, backgroundColor: "#FF98D0" },
];

const TeamCreationPage = () => {
  const [teamName, setTeamName] = useState("");
  const [teamDescription, setTeamDescription] = useState("");
  const [emoji, setEmoji] = useState("");
  const [color, setColor] = useState("");
  const teamDescriptionRef = useRef<HTMLTextAreaElement>(null);

  const navigate = useNavigate();

  const { mutate: createTeam, data } = useMutation(
    () => {
      return appClient
        .post("/teams", {
          name: teamName,
          description: teamDescription,
          emoji,
          color,
        })
        .then((response) => response.data);
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

    if (!teamName) {
      return alert("모임명을 입력해주세요");
    }
    if (!teamDescriptionRef.current?.value) {
      return alert("모임 설명을 입력해주세요");
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
    <RequireLogin>
      <>
        <PageTitleWithBackButton>모임 추가하기</PageTitleWithBackButton>
        <StyledForm>
          <LabeledInput
            labelText="모임명"
            value={teamName}
            setValue={setTeamName}
            pattern={REGEX.TEAM_NAME.source}
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
          <Button
            type="submit"
            onClick={handleTeamCreationSubmit}
            disabled={!(teamName && emoji && color)}
          >
            확인
          </Button>
        </StyledForm>
      </>
    </RequireLogin>
  );
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;

  gap: 40px;
`;
export default TeamCreationPage;
