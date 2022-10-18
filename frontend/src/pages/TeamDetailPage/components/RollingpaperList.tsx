import { Link, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

import IconButton from "@/components/IconButton";
import RollingpaperListItem from "@/pages/TeamDetailPage/components/RollingpaperListItem";

import PlusIcon from "@/assets/icons/bx-plus.svg";
import useValidateParam from "@/hooks/useValidateParam";
import useReadTeamRollingpaper from "@/pages/TeamDetailPage/hooks/useReadTeamRollingpaper";

const RollingpaperList = () => {
  const navigate = useNavigate();
  const teamId = useValidateParam<number>("teamId");

  const {
    isLoading: isLoadingGetTeamRollingpaperList,
    data: teamRollinpaperListResponse,
  } = useReadTeamRollingpaper(teamId);

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

export default RollingpaperList;
