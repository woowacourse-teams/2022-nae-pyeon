import React from "react";
import { useParams } from "react-router-dom";
import styled from "@emotion/styled";
import axios from "axios";
import { useQuery } from "react-query";

import Header from "@/components/Header";
import IconButton from "@/components/IconButton";
import PageTitle from "@/components/PageTitle";
import LetterPaper from "@/components/LetterPaper";

import { Rollingpaper } from "@/types";

import { BiChevronLeft } from "react-icons/bi";

const RollingpaperPage = () => {
  const { rollingpaperId } = useParams();
  const teamId = 123;

  const {
    isLoading,
    isError,
    data: rollingpaper,
  } = useQuery<Rollingpaper>(["rollingpaper"], () =>
    axios
      .get(`/api/v1/teams/${teamId}/rollingpapers/${rollingpaperId}`)
      .then((response) => response.data)
  );

  if (isLoading) {
    return <div>로딩 중</div>;
  }
  if (isError || !rollingpaper) {
    return <div>에러</div>;
  }

  return (
    <>
      <Header>
        <IconButton>
          <BiChevronLeft />
        </IconButton>
        <PageTitle>{rollingpaper.title}</PageTitle>
      </Header>
      <main>
        <LetterPaper to={rollingpaper.to} messageList={rollingpaper.messages} />
      </main>
    </>
  );
};

export default RollingpaperPage;
