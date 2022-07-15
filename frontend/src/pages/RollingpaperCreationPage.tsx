import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { useMutation } from "react-query";

import appClient from "@/api";

import Header from "@/components/Header";
import IconButton from "@/components/IconButton";
import PageTitle from "@/components/PageTitle";
import LabeledInput from "@/components/LabeledInput";
import SearchInput from "@/components/SearchInput";
import LineButton from "@/components/LineButton";

import { Rollingpaper } from "@/types";

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

  const { mutate: postRollingpaper } = useMutation(
    ({
      title,
      addresseeId,
    }: Pick<Rollingpaper, "title"> & { addresseeId: number }) => {
      return appClient
        .post(`/teams/${teamId}/rollingpapers`, {
          title,
          addresseeId,
        })
        .then((response) => response.data);
    },
    {
      onSuccess: (data) => {
        const { id: newRollingpaperId } = data;
        navigate(`/rollingpaper/${newRollingpaperId}`, { replace: true });
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

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

    postRollingpaper({ title: rollingpaperTitle, addresseeId: member.id });
  };

  return (
    <>
      <Header>
        <IconButton>
          <BiChevronLeft />
        </IconButton>
        <PageTitle>롤링페이퍼 만들기</PageTitle>
      </Header>
      <StyledForm onSubmit={handleRollingpaperFormSubmit}>
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
        <LineButton type="submit">완료</LineButton>
      </StyledForm>
    </>
  );
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;

  button {
    align-self: flex-end;
  }
`;

export default RollingpaperCreationPage;
