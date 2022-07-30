import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import styled from "@emotion/styled";

import MyPageTab from "@/components/MyPageTab";
import UserProfile from "@/components/UserProfile";
import MyPagePaginatedRollingpaperList from "@/components/MyPagePaginatedRollingpaperList";
import MyPagePaginatedMessageList from "@/components/MyPagePaginatedMessageList";

import appClient from "@/api";

import { CustomError, ValueOf } from "@/types";

const rollingpapers = [
  { id: 1, title: "소피아 생일 축하해", teamId: 1, teamName: "우테코 4기" },
  { id: 2, title: "소피아 생일 축하해", teamId: 1, teamName: "우테코 4기" },
  { id: 3, title: "소피아 생일 축하해", teamId: 1, teamName: "우테코 4기" },
  { id: 4, title: "소피아 생일 축하해", teamId: 1, teamName: "우테코 4기" },
  { id: 5, title: "소피아 생일 축하해", teamId: 1, teamName: "우테코 4기" },
];

const messages = [
  {
    id: 1,
    rollingpaperId: 1,
    teamId: 1,
    rollingpaperTitle: "소피아의 생일을 축하해",
    to: "소피아",
    team: "우테코 4기",
    content:
      "소피아야 생일 축하해~ 축카추카추 소피아야 생일 축하해~ 축카추카추",
    color: "#C5FF98",
  },
  {
    id: 2,
    rollingpaperId: 1,
    teamId: 1,
    rollingpaperTitle: "소피아의 생일을 축하해",
    to: "소피아",
    team: "우테코 4기",
    content:
      "소피아야 생일 축하해~ 축카추카추 소피아야 생일 축하해~ 축카추카추",
    color: "#C5FF98",
  },
  {
    id: 3,
    rollingpaperId: 1,
    teamId: 1,
    rollingpaperTitle: "소피아의 생일을 축하해",
    to: "소피아",
    team: "우테코 4기",
    content:
      "소피아야 생일 축하해~ 축카추카추 소피아야 생일 축하해~ 축카추카추",
    color: "#FF8181",
  },
  {
    id: 4,
    rollingpaperId: 1,
    teamId: 1,
    rollingpaperTitle: "소피아의 생일을 축하해",
    to: "소피아",
    team: "우테코 4기",
    content:
      "소피아야 생일 축하해~ 축카추카추 소피아야 생일 축하해~ 축카추카추",
    color: "#C5FF98",
  },
  {
    id: 5,
    rollingpaperId: 1,
    teamId: 1,
    rollingpaperTitle: "소피아의 생일을 축하해",
    to: "소피아",
    team: "우테코 4기",
    content:
      "소피아야 생일 축하해~ 축카추카추 소피아야 생일 축하해~ 축카추카추",
    color: "#C5FF98",
  },
];

const TAB = {
  RECEIVED_PAPER: "received_paper",
  SENT_MESSAGE: "sent_message",
} as const;

type TabMode = ValueOf<typeof TAB>;

interface UserProfile {
  id: number;
  username: string;
  email: string;
}

const MyPage = () => {
  const [tab, setTab] = useState<TabMode>(TAB.RECEIVED_PAPER);
  const [receivedCurrentPage, setReceivedCurrentPage] = useState(1);
  const [writtenCurrentPage, setWrittenCurrentPage] = useState(1);

  const {
    isLoading: isLoadingGetUserProfile,
    isError: isErrorGetUserProfile,
    error: getUserProfileError,
    data: userProfile,
  } = useQuery<UserProfile>(["user-profile"], () =>
    appClient.get("/members/me").then((response) => response.data)
  );

  if (isLoadingGetUserProfile) {
    return <div>로딩중</div>;
  }

  if (isErrorGetUserProfile) {
    if (
      axios.isAxiosError(getUserProfileError) &&
      getUserProfileError.response
    ) {
      const customError = getUserProfileError.response.data as CustomError;
      return <div>{customError.message}</div>;
    }
    return <div>에러</div>;
  }

  if (!userProfile) {
    return <div>에러</div>;
  }

  return (
    <>
      <UserProfile username={userProfile.username} email={userProfile.email} />
      <StyledTabs>
        <MyPageTab
          number={rollingpapers.length}
          text="받은 롤링페이퍼"
          activate={tab === TAB.RECEIVED_PAPER}
          onClick={() => {
            setTab(TAB.RECEIVED_PAPER);
          }}
        />
        <MyPageTab
          number={messages.length}
          text="작성한 메시지"
          activate={tab === TAB.SENT_MESSAGE}
          onClick={() => {
            setTab(TAB.SENT_MESSAGE);
          }}
        />
      </StyledTabs>
      {tab === TAB.RECEIVED_PAPER ? (
        <MyPagePaginatedRollingpaperList
          rollingpapers={rollingpapers}
          currentPage={receivedCurrentPage}
          maxPage={10}
          setCurrentPage={setReceivedCurrentPage}
        />
      ) : (
        <MyPagePaginatedMessageList
          messages={messages}
          currentPage={writtenCurrentPage}
          maxPage={10}
          setCurrentPage={setWrittenCurrentPage}
        />
      )}
    </>
  );
};

const StyledTabs = styled.div`
  display: flex;

  border-top: 1px solid ${({ theme }) => theme.colors.GRAY_400};
  border-bottom: 1px solid ${({ theme }) => theme.colors.GRAY_400};

  padding: 12px;
  gap: 20px;
`;

export default MyPage;
