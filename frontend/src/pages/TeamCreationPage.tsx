import React, { useState, useRef } from "react";
import styled from "@emotion/styled";

import IconButton from "@/components/IconButton";
import LabeledInput from "@/components/LabeledInput";
import LabeledRadio from "@/components/LabeledRadio";
import LabeledTextArea from "@/components/LabeledTextArea";
import Header from "@/components/Header";

import { BiChevronLeft } from "react-icons/bi";
import PageTitle from "@/components/PageTitle";
import Button from "@/components/Button";

const emojis = [
  { value: "🐶" },
  { value: "❤️" },
  { value: "👍" },
  { value: "✏️" },
  { value: "🏃‍♀️" },
  { value: "☕️" },
];

const colors = [
  { backgroundColor: "#C5FF98" },
  { backgroundColor: "#FF8181" },
  { backgroundColor: "#FFF598" },
  { backgroundColor: "#98DAFF" },
  { backgroundColor: "#98A2FF" },
  { backgroundColor: "#FF98D0" },
];

const TeamCreationPage = () => {
  const [teamName, setTeamName] = useState("");
  const [emoji, setEmoji] = useState("");
  const [color, setColor] = useState("");
  const teamDescriptionRef = useRef<HTMLTextAreaElement>(null);

  const handleTeamCreationSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(teamDescriptionRef.current?.value, emoji, color);
  };

  return (
    <>
      <Header>
        <IconButton>
          <BiChevronLeft />
        </IconButton>
        <PageTitle>모임 추가하기</PageTitle>
      </Header>
      <StyledMain>
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
      </StyledMain>
    </>
  );
};

const StyledMain = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 50px;

  gap: 40px;
`;
export default TeamCreationPage;
