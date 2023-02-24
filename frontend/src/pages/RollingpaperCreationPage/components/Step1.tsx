import { Navigate, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

import useIntersect from "@/hooks/useIntersect";
import { useReadMyTeamsPaging } from "@/hooks/api/team";

import LineButton from "@/components/LineButton";
import MyTeamCard from "@/components/MyTeamCard";
import Loading from "@/components/Loading";
import StepLayout from "@/pages/RollingpaperCreationPage/components/StepLayout";

import { Team } from "@/types";

interface Step1Props {
  onSelectTeam: (id: Team["id"]) => void;
  selected: Team["id"] | null;
}

const Step1 = ({ onSelectTeam, selected }: Step1Props) => {
  const infiniteRef = useIntersect({
    onIntersect: async (entry, observer) => {
      observer.unobserve(entry.target);
      if (hasNextPage && !isFetching) {
        fetchNextPage();
      }
    },
    options: { rootMargin: "10px", threshold: 1.0 },
  });

  const {
    data: myTeamListResponse,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
  } = useReadMyTeamsPaging();

  if (isLoading) {
    return (
      <StepLayout>
        <Loading />
      </StepLayout>
    );
  }

  if (!myTeamListResponse) {
    return <Navigate to="/" replace />;
  }

  return (
    <StepLayout title="모임을 선택해주세요">
      {myTeamListResponse.pages[0].totalCount === 0 ? (
        <EmptyMyTeamList />
      ) : (
        <StyledCardList>
          {myTeamListResponse.pages.map((page) =>
            page.teams.map(({ id, name, description, emoji, color }) => (
              <MyTeamCard
                key={id}
                id={id}
                name={name}
                description={description}
                emoji={emoji}
                color={color}
                onClick={() => onSelectTeam(id)}
                selected={id === selected}
              />
            ))
          )}
          <div ref={infiniteRef} />
        </StyledCardList>
      )}
    </StepLayout>
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
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-row-gap: 24px;
  grid-column-gap: 10px;
  justify-items: center;
  align-items: center;

  @media only screen and (min-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media only screen and (min-width: 1280px) {
    grid-template-columns: repeat(3, 1fr);
  }

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
  height: 100%;

  gap: 8px;
`;

const StyledMessage = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.GRAY_400};

  margin: 20px 0;
`;

export default Step1;
