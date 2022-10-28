import styled from "@emotion/styled";
import { useNavigate, Link } from "react-router-dom";

import useIntersect from "@/hooks/useIntersect";
import { useReadMyTeamsPaging } from "@/hooks/api/team";

import MyTeamCard from "@/components/MyTeamCard";
import LineButton from "@/components/LineButton";
import Loading from "@/components/Loading";

import ErrorImg from "@/assets/images/empty-state.svg";

import { Team } from "@/types";

const MyTeamsPage = () => {
  const {
    data: myTeamListResponse,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
  } = useReadMyTeamsPaging();

  const ref = useIntersect({
    onIntersect: async (entry, observer) => {
      observer.unobserve(entry.target);
      if (hasNextPage && !isFetching) {
        fetchNextPage();
      }
    },
    options: { rootMargin: "10px", threshold: 1.0 },
  });

  if (isLoading || !myTeamListResponse) {
    return <Loading />;
  }

  if (myTeamListResponse.pages[0]?.teams.length === 0) {
    return (
      <StyledEmptyMain>
        <EmptyMyTeamList />
      </StyledEmptyMain>
    );
  }

  return (
    <main>
      <StyledTitle>내가 가입한 모임 목록</StyledTitle>
      <StyledCardList>
        {myTeamListResponse.pages.map((page) =>
          page.teams.map(({ id, name, description, emoji, color }: Team) => (
            <Link to={`/team/${id}`} key={id}>
              <MyTeamCard
                id={id}
                name={name}
                description={description}
                emoji={emoji}
                color={color}
              />
            </Link>
          ))
        )}
        <div ref={ref} />
      </StyledCardList>
    </main>
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
      <ErrorImg />
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

const StyledEmptyMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  height: calc(100vh - 150px);
  button {
    width: 152px;
  }
  svg {
    font-size: 200px;
  }
`;

const StyledTitle = styled.h1`
  font-size: 24px;
  text-align: center;

  margin-bottom: 28px;
`;

const StyledCardList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-row-gap: 24px;
  grid-column-gap: 10px;
  justify-items: center;
  align-items: stretch;
  min-height: calc(100vh - 150px);

  padding-bottom: 20px;

  @media only screen and (min-width: 960px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media only screen and (min-width: 1280px) {
    grid-template-columns: repeat(4, 1fr);
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

  margin: 20px 0;
`;

export default MyTeamsPage;
