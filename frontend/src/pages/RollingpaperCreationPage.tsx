import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import axios from "axios";

import Header from "@/components/Header";
import IconButton from "@/components/IconButton";
import PageTitle from "@/components/PageTitle";
import LabeledInput from "@/components/LabeledInput";
import SearchInput from "@/components/SearchInput";
import Button from "@/components/Button";

import { BiChevronLeft } from "react-icons/bi";

const memberListDummy = [
  {
    id: 1,
    name: "도리",
  },
  {
    id: 2,
    name: "소피아",
  },
  {
    id: 3,
    name: "승팡",
  },
  {
    id: 4,
    name: "알렉스",
  },
  {
    id: 5,
    name: "제로",
  },
  {
    id: 6,
    name: "케이",
  },
];

const RollingpaperCreationPage = () => {
  const navigate = useNavigate();
  const [rollingpaperTitle, setRollingpaperTitle] = useState("");
  const [rollingpaperTo, setRollingpaperTo] = useState("");

  const teamId = 123;

  const handleRollingpaperFormSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const member = memberListDummy.find(
      (member) => member.name === rollingpaperTo
    );

    if (!member) {
      alert("올바른 롤링페이퍼 대상을 선택해주세요.");
      return;
    }

    axios
      .post(`/api/v1/teams/${teamId}/rollingpapers`, {
        title: rollingpaperTitle,
        memberId: member.id,
      })
      .then((response) => {
        const { id: newRollingpaperId } = response.data;
        navigate(`/rollingpaper/${newRollingpaperId}`, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Header>
        <IconButton>
          <BiChevronLeft />
        </IconButton>
        <PageTitle>롤링페이퍼 만들기</PageTitle>
      </Header>
      <StyledMain onSubmit={handleRollingpaperFormSubmit}>
        <LabeledInput
          labelText="롤링페이퍼 이름"
          value={rollingpaperTitle}
          setValue={setRollingpaperTitle}
        />
        <SearchInput
          labelText="롤링페이퍼 대상"
          value={rollingpaperTo}
          setValue={setRollingpaperTo}
          searchKeywordList={memberListDummy.map((member) => member.name)}
        />
        <Button type="submit">완료</Button>
      </StyledMain>
    </>
  );
};

const StyledMain = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;

  padding: 48px 25px;

  button {
    align-self: flex-end;
  }
`;

export default RollingpaperCreationPage;
