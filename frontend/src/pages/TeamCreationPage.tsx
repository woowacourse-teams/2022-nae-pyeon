import React, { useState, useRef } from "react";
import styled from "@emotion/styled";
import { useMutation } from "react-query";

import appClient from "@/api";

import LabeledInput from "@/components/LabeledInput";
import LabeledRadio from "@/components/LabeledRadio";
import LabeledTextArea from "@/components/LabeledTextArea";
import Button from "@/components/Button";
import PageTitleWithBackButton from "@/components/PageTitleWithBackButton";

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
  const [emoji, setEmoji] = useState("");
  const [color, setColor] = useState("");
  const teamDescriptionRef = useRef<HTMLTextAreaElement>(null);

  const { mutate: createTeam, data } = useMutation(
    () => {
      return appClient
        .post(
          "/teams",
          {
            name: teamName,
            description: teamDescriptionRef.current?.value,
            emoji,
            color,
          },
          {
            headers: {
              Authorization: `Baerer ${"token"}`,
            },
          }
        )
        .then((response) => response.data);
    },
    {
      onSuccess: () => {
        console.log(data);
      },
    }
  );

  const handleTeamCreationSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    createTeam();
  };

  return (
    <>
      <PageTitleWithBackButton>모임 추가하기</PageTitleWithBackButton>
      <StyledForm>
        <LabeledInput
          labelText="모임명"
          value={teamName}
          setValue={setTeamName}
        />
        <LabeledTextArea
          labelText="모임 설명"
          ref={teamDescriptionRef}
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
        <Button type="submit" onClick={handleTeamCreationSubmit}>
          확인
        </Button>
      </StyledForm>
    </>
  );
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;

  gap: 40px;
`;
export default TeamCreationPage;
