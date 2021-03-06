import React, { useState } from "react";
import { useQuery, useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import styled from "@emotion/styled";
import axios from "axios";

import appClient from "@/api";

import PageTitleWithBackButton from "@/components/PageTitleWithBackButton";
import LabeledInput from "@/components/LabeledInput";
import AutoCompleteInput from "@/components/AutoCompleteInput";
import Button from "@/components/Button";

import { Rollingpaper, CustomError } from "@/types";

interface TeamMemberResponse {
  members: TeamMember[];
}

interface TeamMember {
  id: number;
  nickname: string;
}

const RollingpaperCreationPage = () => {
  const navigate = useNavigate();
  const { teamId } = useParams();
  const [rollingpaperTitle, setRollingpaperTitle] = useState("");
  const [rollingpaperTo, setRollingpaperTo] = useState("");

  const {
    isLoading,
    isError,
    data: teamMemberResponse,
  } = useQuery<TeamMemberResponse>(["team-member"], () =>
    appClient.get(`/teams/${teamId}/members`).then((response) => response.data)
  );

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
        navigate(`/team/${teamId}/rollingpaper/${newRollingpaperId}`, {
          replace: true,
        });
      },
      onError: (error) => {
        if (axios.isAxiosError(error) && error.response) {
          const customError = error.response.data as CustomError;
          alert(customError.message);
        }
      },
    }
  );

  const handleRollingpaperFormSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const member = teamMemberResponse?.members.find(
      (member) => member.nickname === rollingpaperTo
    );

    if (!member) {
      alert("????????? ??????????????? ????????? ??????????????????.");
      return;
    }

    postRollingpaper({ title: rollingpaperTitle, addresseeId: member.id });
  };

  if (isLoading) {
    return <div>?????? ???</div>;
  }
  if (isError || !teamMemberResponse) {
    return <div>??????</div>;
  }

  return (
    <>
      <PageTitleWithBackButton>??????????????? ?????????</PageTitleWithBackButton>
      <StyledForm onSubmit={handleRollingpaperFormSubmit}>
        <LabeledInput
          labelText="??????????????? ??????"
          value={rollingpaperTitle}
          setValue={setRollingpaperTitle}
        />
        <AutoCompleteInput
          labelText="??????????????? ??????"
          value={rollingpaperTo}
          setValue={setRollingpaperTo}
          searchKeywordList={teamMemberResponse.members.map(
            (member) => member.nickname
          )}
        />
        <Button type="submit">??????</Button>
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
