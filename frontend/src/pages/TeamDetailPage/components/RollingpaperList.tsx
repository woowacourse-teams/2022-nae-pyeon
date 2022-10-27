import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

import useValidateParam from "@/hooks/useValidateParam";
import { useReadTeamRollingpaper } from "@/hooks/api/team";

import Loading from "@/components/Loading";
import RollingpaperListItem from "@/pages/TeamDetailPage/components/RollingpaperListItem";
import EmptyTeamRollingpaper from "@/pages/TeamDetailPage/components/EmptyTeamRollingpaper";

import { RECIPIENT, ROLLINGPAPER_ORDER } from "@/constants";

import { GetTeamRollingpapersRequest } from "@/types/apiRequest";

const RollingpaperList = () => {
  const teamId = useValidateParam<number>("teamId");
  const [order, setOrder] = useState<GetTeamRollingpapersRequest["order"]>(
    ROLLINGPAPER_ORDER.LATEST
  );
  const [filter, setFilter] = useState<GetTeamRollingpapersRequest["filter"]>();

  const {
    isLoading: isLoadingGetTeamRollingpaperList,
    data: teamRollinpaperListResponse,
  } = useReadTeamRollingpaper({
    id: teamId,
    order,
    filter,
  });

  if (isLoadingGetTeamRollingpaperList || !teamRollinpaperListResponse) {
    return <Loading />;
  }

  if (teamRollinpaperListResponse.rollingpapers.length === 0) {
    return <EmptyTeamRollingpaper />;
  }

  return (
    <StyledRollingpaperListContainer>
      <StyledRollingpaperListHead>
        <h4>롤링페이퍼 목록</h4>
        <StyledSelectContainer>
          <select
            value={order}
            onChange={(e) => {
              setOrder(e.target.value as GetTeamRollingpapersRequest["order"]);
            }}
          >
            <option value={ROLLINGPAPER_ORDER.LATEST}>최신 순</option>
            <option value={ROLLINGPAPER_ORDER.OLDEST}>오래된 순</option>
          </select>
          <select
            value={filter}
            onChange={(e) => {
              setFilter(
                e.target.value as GetTeamRollingpapersRequest["filter"]
              );
            }}
          >
            <option value={""}>전체</option>
            <option value={RECIPIENT.TEAM.toLowerCase()}>모임</option>
            <option value={RECIPIENT.MEMBER.toLowerCase()}>멤버</option>
          </select>
        </StyledSelectContainer>
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
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 90%;
`;

const StyledRollingpaperListHead = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;

  h4 {
    font-size: 20px;
    font-weight: 600;
  }

  @media only screen and (min-width: 600px) {
    flex-direction: row;
  }
`;

const StyledSelectContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;

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
