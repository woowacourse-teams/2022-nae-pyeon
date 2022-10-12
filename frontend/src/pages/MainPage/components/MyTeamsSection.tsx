import styled from "@emotion/styled";
import { useNavigate, Link } from "react-router-dom";

import LineButton from "@/components/LineButton";
import MyTeamCard from "@/components/MyTeamCard";

import useReadMyTeams from "@/pages/MainPage/hooks/useReadMyTeams";

import SectionHeader from "@/pages/MainPage/components/SectionHeader";

const MyTeamsSection = () => {
  const { data: myTeamListResponse, isLoading: isLoadingTeams } =
    useReadMyTeams();

  return (
    <section>
      <SectionHeader
        title="내편들"
        count={myTeamListResponse?.totalCount}
        moreLink="/"
      />
      <StyledCardList>
        {myTeamListResponse?.teams.length === 0 ? (
          <EmptyMyTeamList />
        ) : (
          myTeamListResponse?.teams.map(
            ({ id, name, description, emoji, color }) => (
              <Link to={`team/${id}`} key={id}>
                <MyTeamCard
                  id={id}
                  name={name}
                  description={description}
                  emoji={emoji}
                  color={color}
                />
              </Link>
            )
          )
        )}
      </StyledCardList>
    </section>
  );
};

const EmptyMyTeamList = () => {
  const navigate = useNavigate();

  const handleJoinTeamButtonClick = () => {
    navigate("/search");
  };

  const handleCreateTeamButtonClick = () => {
    navigate("/team/new");
  };

  return (
    <StyledEmptyCardList>
      <StyledMessage>아직 참여한 모임이 없어요!</StyledMessage>
      <LineButton onClick={handleJoinTeamButtonClick}>
        참가할 모임 찾기
      </LineButton>
      <LineButton onClick={handleCreateTeamButtonClick}>
        새 모임 만들기
      </LineButton>
    </StyledEmptyCardList>
  );
};

const StyledCardList = styled.div`
  display: flex;
  overflow-x: scroll;
  gap: 20px;
  align-items: center;

  height: 100%;
  padding: 10px;
  a {
    height: fit-content;
  }
`;

const StyledEmptyCardList = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  width: 100%;

  gap: 8px;

  @media only screen and (min-width: 600px) {
    height: 210px;
  }

  @media only screen and (min-width: 600px) {
    height: 250px;
  }

  @media only screen and (min-width: 960px) {
    height: 290px;
  }
`;

const StyledMessage = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.GRAY_400};

  margin-bottom: 20px;
`;

export default MyTeamsSection;
