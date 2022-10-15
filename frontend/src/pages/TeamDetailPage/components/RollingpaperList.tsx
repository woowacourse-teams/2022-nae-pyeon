import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

import IconButton from "@/components/IconButton";
import RollingpaperListItem from "@/pages/TeamDetailPage/components/RollingpaperListItem";

import useValidateParam from "@/hooks/useValidateParam";
import useReadTeamRollingpaper from "@/pages/TeamDetailPage/hooks/useReadTeamRollingpaper";

import { RECIPIENT, ROLLINGPAPER_ORDER } from "@/constants";

import { GetTeamRollingpapersRequest } from "@/types/apiRequest";

import PlusIcon from "@/assets/icons/bx-plus.svg";

const RollingpaperList = () => {
  const navigate = useNavigate();
  const teamId = useValidateParam<number>("teamId");
  const [order, setOrder] = useState<GetTeamRollingpapersRequest["order"]>(
    ROLLINGPAPER_ORDER.LATEST
  );
  const [filter, setFilter] = useState<GetTeamRollingpapersRequest["filter"]>();

  const {
    isLoading: isLoadingGetTeamRollingpaperList,
    data: teamRollinpaperListResponse,
    refetch,
  } = useReadTeamRollingpaper({
    id: teamId,
    order,
    filter,
  });

  useEffect(() => {
    refetch();
  }, [order, filter]);

  if (isLoadingGetTeamRollingpaperList) {
    return <div>로딩중</div>;
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
            navigate(`/rollingpaper/new?team-id=${teamId}`);
          }}
        >
          <PlusIcon />
        </IconButton>
      </StyledRollingpaperListHead>
      <StyledSelectContainer>
        <select
          onChange={(e) => {
            setOrder(e.target.value as GetTeamRollingpapersRequest["order"]);
          }}
        >
          <option value={ROLLINGPAPER_ORDER.LATEST}>최신 순</option>
          <option value={ROLLINGPAPER_ORDER.OLDEST}>오래된 순</option>
        </select>
        <select
          onChange={(e) => {
            setFilter(e.target.value as GetTeamRollingpapersRequest["filter"]);
          }}
        >
          <option value={""}>전체</option>
          <option value={RECIPIENT.TEAM.toLowerCase()}>모임</option>
          <option value={RECIPIENT.MEMBER.toLowerCase()}>멤버</option>
        </select>
      </StyledSelectContainer>

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
  width: 90%;
`;

const StyledRollingpaperListHead = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  padding: 0 0 16px 0;

  h4 {
    font-size: 20px;
    font-weight: bold;
  }
`;

const StyledSelectContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;

  padding: 0 0 16px 0;

  select {
    padding: 6px 8px;
  }
`;

const StyledRollingpaperList = styled.ul`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export default RollingpaperList;
