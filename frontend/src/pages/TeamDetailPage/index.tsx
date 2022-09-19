import styled from "@emotion/styled";

import TeamDescriptionBox from "@/pages/TeamDetailPage/components/TeamDescriptionBox";
import RollingpaperList from "@/pages/TeamDetailPage/components/RollingpaperList";
import TeamJoinSection from "@/pages/TeamDetailPage/components/TeamJoinSection";

import useValidatedParam from "@/hooks/useValidatedParam";
import useReadTeamDetail from "./hooks/useReadTeamDetail";

const TeamDetailPage = () => {
  const teamId = useValidatedParam<number>("teamId");

  const { isLoading: isLoadingTeamDetail, data: teamDetail } =
    useReadTeamDetail(teamId);

  if (isLoadingTeamDetail) {
    return <div>로딩중</div>;
  }

  if (!teamDetail) {
    return <div>에러</div>;
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

export default TeamDetailPage;
