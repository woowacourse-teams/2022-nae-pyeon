import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "@emotion/styled";
import axios from "axios";

import Header from "@/components/Header";
import IconButton from "@/components/IconButton";
import PageTitle from "@/components/PageTitle";
import LetterPaper from "@/components/LetterPaper";

import { BiChevronLeft } from "react-icons/bi";

const StyledPageContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
`;

const StyledMain = styled.main`
  padding: 10px 25px;
`;

type messages = {
  id: number;
  content: string;
  from: string;
  authorId: number;
};
interface rollingpaperType {
  id: number;
  title: string;
  to: string;
  messages: messages[];
}

const RollingpaperPage = () => {
  const { rollingpaperId } = useParams();
  const teamId = 123;
  const [rollingpaper, setRollingpaper] = useState<rollingpaperType | null>(
    null
  );

  useEffect(() => {
    axios
      .get(`/api/v1/teams/${teamId}/rollingpapers/${rollingpaperId}`)
      .then(function (response) {
        setRollingpaper(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  if (rollingpaper === null) {
    return (
      <StyledPageContainer>
        <Header>
          <IconButton>
            <BiChevronLeft />
          </IconButton>
        </Header>
      </StyledPageContainer>
    );
  }

  return (
    <StyledPageContainer>
      <Header>
        <IconButton>
          <BiChevronLeft />
        </IconButton>
        <PageTitle>{rollingpaper.title}</PageTitle>
      </Header>
      <StyledMain>
        <LetterPaper to={rollingpaper.to} messageList={rollingpaper.messages} />
      </StyledMain>
    </StyledPageContainer>
  );
};

export default RollingpaperPage;
