import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

import useValidateParam from "@/hooks/useValidateParam";
import useReadTeamDetail from "@/pages/TeamDetailPage/hooks/useReadTeamDetail";

import Loading from "@/components/Loading";
import TeamDescriptionBox from "@/pages/TeamDetailPage/components/TeamDescriptionBox";
import RollingpaperList from "@/pages/TeamDetailPage/components/RollingpaperList";
import TeamJoinSection from "@/pages/TeamDetailPage/components/TeamJoinSection";

const TeamDetailPage = () => {
  const teamId = useValidateParam<number>("teamId");
  const navigate = useNavigate();

  const { isLoading: isLoadingTeamDetail, data: teamDetail } =
    useReadTeamDetail(teamId);

  if (isLoadingTeamDetail || !teamDetail) {
    return <Loading />;
  }

  return (
    <StyledMain>
      <TeamDescriptionBox
        emoji={teamDetail.emoji}
        name={teamDetail.name}
        description={teamDetail.description}
        color={teamDetail.color}
        joined={teamDetail.joined}
      />
      <StyledRollingpaperCreateButton
        onClick={() => {
          navigate(`/rollingpaper/new?team-id=${teamId}`);
        }}
      >
        📜 롤링페이퍼 만들기
      </StyledRollingpaperCreateButton>
      {teamDetail.joined ? (
        <RollingpaperList />
      ) : (
        <TeamJoinSection isSecretTeam={teamDetail.secret} />
      )}
    </StyledMain>
  );
};

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 40px;

  padding: 28px 0;
`;

const StyledRollingpaperCreateButton = styled.button`
  width: 90%;
  align-self: center;
  padding: 16px;

  font-size: 18px;
  background: antiquewhite;

  &:hover {
    background: #f9e1c3;
  }
`;

export default TeamDetailPage;
