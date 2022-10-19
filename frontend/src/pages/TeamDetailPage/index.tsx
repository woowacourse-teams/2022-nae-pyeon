import styled from "@emotion/styled";

import useValidateParam from "@/hooks/useValidateParam";
import useReadTeamDetail from "@/pages/TeamDetailPage/hooks/useReadTeamDetail";

import Loading from "@/components/Loading";
import TeamDescriptionBox from "@/pages/TeamDetailPage/components/TeamDescriptionBox";
import RollingpaperList from "@/pages/TeamDetailPage/components/RollingpaperList";
import TeamJoinSection from "@/pages/TeamDetailPage/components/TeamJoinSection";

const TeamDetailPage = () => {
  const teamId = useValidateParam<number>("teamId");

  const { isLoading: isLoadingTeamDetail, data: teamDetail } =
    useReadTeamDetail(teamId);

  if (isLoadingTeamDetail) {
    return <Loading />;
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
