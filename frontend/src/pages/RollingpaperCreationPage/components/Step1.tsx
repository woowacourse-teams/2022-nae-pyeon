import { Navigate } from "react-router-dom";
import styled from "@emotion/styled";

import useIntersect from "@/hooks/useIntersect";
import useReadMyTeams from "@/hooks/api/team/useReadMyTeams";

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
  } = useReadMyTeams();

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
    </StepLayout>
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

export default Step1;
