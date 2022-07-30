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

type TabMode = ValueOf<typeof TAB>;

const TAB = {
  RECEIVED_PAPER: "received_paper",
  SENT_MESSAGE: "sent_message",
} as const;

interface UserProfile {
  id: number;
  username: string;
  email: string;
}

interface ReceivedRollingpaper {
  id: number;
  title: string;
  teamId: number;
  teamName: string;
}

interface SentMessage {
  id: number;
  rollingpaperId: number;
  rollingpaperTitle: string;
  teamId: number;
  teamName: string;
  to: string;
  content: string;
  color: string;
}

interface ResponseReceivedRollingpapers {
  totalCount: number;
  currentPage: number;
  rollingpapers: ReceivedRollingpaper[];
}

interface ResponseSentMessages {
  totalCount: number;
  currentPage: number;
  messages: SentMessage[];
}

const MyPage = () => {
  const [tab, setTab] = useState<TabMode>(TAB.RECEIVED_PAPER);
  const [receivedRollingpapersPage, setReceivedRollingpapersPage] = useState(1);
  const [sentMessagesCurrentPage, setSentMessagesCurrentPage] = useState(1);

  const {
    isLoading: isLoadingGetUserProfile,
    isError: isErrorGetUserProfile,
    error: getUserProfileError,
    data: userProfile,
  } = useQuery<UserProfile>(["user-profile"], () =>
    appClient.get("/members/me").then((response) => response.data)
  );

  const contentCountPerPage = 5;

  const fetchReceivedRollingpapers = (page = 1) => {
    const searchParams = new URLSearchParams({
      page: page.toString(),
      count: contentCountPerPage.toString(),
    });

    return appClient
      .get(`/members/me/rollingpapers/received?${searchParams.toString()}`)
      .then((response) => response.data);
  };

  const fetchSentMessage = (page = 1) => {
    const searchParams = new URLSearchParams({
      page: page.toString(),
      count: contentCountPerPage.toString(),
    });

    return appClient
      .get(`/members/me/messages/written?${searchParams.toString()}`)
      .then((response) => response.data);
  };

  const {
    isLoading: isLoadingGetReceivedRollingpapers,
    isError: isErrorGetReceivedRollingpapers,
    error: getReceivedRollingpapersError,
    data: responseReceivedRollingpapers,
  } = useQuery<ResponseReceivedRollingpapers>(
    ["received-rollingpapers", receivedRollingpapersPage],
    () => fetchReceivedRollingpapers(receivedRollingpapersPage),
    { keepPreviousData: true }
  );

  const {
    isLoading: isLoadingGetSentMessages,
    isError: isErrorGetSentMessages,
    error: getSentMessagesError,
    data: responseSentMessages,
  } = useQuery<ResponseSentMessages>(
    ["sent-messages", sentMessagesCurrentPage],
    () => fetchSentMessage(sentMessagesCurrentPage),
    { keepPreviousData: true }
  );

  if (
    isLoadingGetUserProfile ||
    isLoadingGetReceivedRollingpapers ||
    isLoadingGetSentMessages
  ) {
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

  if (isErrorGetReceivedRollingpapers) {
    if (
      axios.isAxiosError(getReceivedRollingpapersError) &&
      getReceivedRollingpapersError.response
    ) {
      const customError = getReceivedRollingpapersError.response
        .data as CustomError;
      return <div>{customError.message}</div>;
    }
    return <div>에러</div>;
  }

  if (isErrorGetSentMessages) {
    if (
      axios.isAxiosError(getSentMessagesError) &&
      getSentMessagesError.response
    ) {
      const customError = getSentMessagesError.response.data as CustomError;
      return <div>{customError.message}</div>;
    }
    return <div>에러</div>;
  }

  if (!userProfile) {
    return <div>에러</div>;
  }

  if (!responseReceivedRollingpapers) {
    return <div>에러</div>;
  }

  if (!responseSentMessages) {
    return <div>에러</div>;
  }

  return (
    <>
      <UserProfile username={userProfile.username} email={userProfile.email} />
      <StyledTabs>
        <MyPageTab
          number={responseReceivedRollingpapers.rollingpapers.length}
          text="받은 롤링페이퍼"
          activate={tab === TAB.RECEIVED_PAPER}
          onClick={() => {
            setTab(TAB.RECEIVED_PAPER);
          }}
        />
        <MyPageTab
          number={responseSentMessages.messages.length}
          text="작성한 메시지"
          activate={tab === TAB.SENT_MESSAGE}
          onClick={() => {
            setTab(TAB.SENT_MESSAGE);
          }}
        />
      </StyledTabs>
      {tab === TAB.RECEIVED_PAPER ? (
        <MyPagePaginatedRollingpaperList
          rollingpapers={responseReceivedRollingpapers.rollingpapers}
          currentPage={receivedRollingpapersPage}
          maxPage={10}
          setCurrentPage={setReceivedRollingpapersPage}
        />
      ) : (
        <MyPagePaginatedMessageList
          messages={responseSentMessages.messages}
          currentPage={sentMessagesCurrentPage}
          maxPage={10}
          setCurrentPage={setSentMessagesCurrentPage}
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
