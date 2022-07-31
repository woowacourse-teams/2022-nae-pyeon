import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import styled from "@emotion/styled";

import IconButton from "@/components/IconButton";
import RollingpaperListItem from "@/components/RollingpaperListItem";

import appClient from "@/api";
import { CustomError } from "@/types";

import PlusIcon from "@/assets/icons/bx-plus.svg";

interface Rollingpaper {
  id: number;
  title: string;
  to: string;
}

interface TeamRollingpaperListResponse {
  rollingpapers: Omit<Rollingpaper, "messages">[];
}

const TeamRollingpaperList = () => {
  const navigate = useNavigate();
  const { teamId } = useParams();

  const {
    isLoading: isLoadingGetTeamRollingpaperList,
    isError: isErrorGetTeamRollingpaperList,
    error: getTeamRollingpaperListError,
    data: teamRollinpaperListResponse,
  } = useQuery<TeamRollingpaperListResponse>(["rollingpaperList"], () =>
    appClient.get(`/teams/${teamId}/rollingpapers`).then((response) => {
      return response.data;
    })
  );

  if (isLoadingGetTeamRollingpaperList) {
    return <div>로딩중</div>;
  }

  if (isErrorGetTeamRollingpaperList) {
    if (
      axios.isAxiosError(getTeamRollingpaperListError) &&
      getTeamRollingpaperListError.response
    ) {
      const customError = getTeamRollingpaperListError.response
        .data as CustomError;
      return <div>{customError.message}</div>;
    }
    return <div>에러</div>;
  }

  if (!teamRollinpaperListResponse) {
    return <div>에러</div>;
  }

  return (
    <StyledRollingpaperListContainer>
      <StyledRollingpaperListHead>
        <h4>롤링페이퍼 목록</h4>
        <IconButton
          size="small"
          onClick={() => {
            navigate("rollingpaper/new");
          }}
        >
          <PlusIcon />
        </IconButton>
      </StyledRollingpaperListHead>
      <StyledRollingpaperList>
        {teamRollinpaperListResponse.rollingpapers.map((rollingpaper) => (
          <Link key={rollingpaper.id} to={`rollingpaper/${rollingpaper.id}`}>
            <RollingpaperListItem {...rollingpaper} />
          </Link>
        ))}
      </StyledRollingpaperList>
    </StyledRollingpaperListContainer>
  );
};

const StyledRollingpaperListContainer = styled.div`
  width: 80%;
`;

const StyledRollingpaperListHead = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  padding: 16px 0;

  h4 {
    font-size: 20px;
    font-weight: bold;
  }
`;

const StyledRollingpaperList = styled.ul`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export default TeamRollingpaperList;
