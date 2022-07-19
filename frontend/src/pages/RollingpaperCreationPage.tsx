import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "@emotion/styled";
import { useQuery, useMutation } from "react-query";

import appClient from "@/api";

import PageTitleWithBackButton from "@/components/PageTitleWithBackButton";
import LabeledInput from "@/components/LabeledInput";
import AutoCompleteInput from "@/components/AutoCompleteInput";
import Button from "@/components/Button";
import RequireLogin from "@/components/RequireLogin";

import { Rollingpaper } from "@/types";

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

    const member = teamMemberResponse?.members.find(
      (member) => member.nickname === rollingpaperTo
    );

    if (!member) {
      alert("올바른 롤링페이퍼 대상을 선택해주세요.");
      return;
    }

    postRollingpaper({ title: rollingpaperTitle, addresseeId: member.id });
  };

  if (isLoading) {
    return <div>로딩 중</div>;
  }
  if (isError || !teamMemberResponse) {
    return <div>에러</div>;
  }

  return (
    <RequireLogin>
      <>
        <PageTitleWithBackButton>롤링페이퍼 만들기</PageTitleWithBackButton>
        <StyledForm onSubmit={handleRollingpaperFormSubmit}>
          <LabeledInput
            labelText="롤링페이퍼 이름"
            value={rollingpaperTitle}
            setValue={setRollingpaperTitle}
          />
          <AutoCompleteInput
            labelText="롤링페이퍼 대상"
            value={rollingpaperTo}
            setValue={setRollingpaperTo}
            searchKeywordList={teamMemberResponse.members.map(
              (member) => member.nickname
            )}
          />
          <Button type="submit">완료</Button>
        </StyledForm>
      </>
    </RequireLogin>
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
