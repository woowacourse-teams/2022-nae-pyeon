import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import styled from "@emotion/styled";

import MyPageTab from "@/pages/MyPage/components/MyPageTab";
import UserProfile from "@/pages/MyPage/components/UserProfile";
import RollingpaperList from "@/pages/MyPage/components/RollingpaperList";
import MessageList from "@/pages/MyPage/components/MessageList";

import { appClient } from "@/api";

import {
  ReceivedRollingpaper,
  UserInfo,
  SentMessage,
  CustomError,
  ValueOf,
} from "@/types";

type TabMode = ValueOf<typeof TAB>;

const TAB = {
  RECEIVED_PAPER: "received_paper",
  SENT_MESSAGE: "sent_message",
} as const;

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

const contentCountPerPage = 5;

const MyPage = () => {
  const [tab, setTab] = useState<TabMode>(TAB.RECEIVED_PAPER);
  const [receivedRollingpapersPage, setReceivedRollingpapersPage] = useState(0);
  const [sentMessagesCurrentPage, setSentMessagesCurrentPage] = useState(0);

  const fetchUserInfo = () => {
    return appClient.get("/members/me").then((response) => response.data);
  };

  const fetchReceivedRollingpapers = (page = 0, count = 5) => {
    return appClient
      .get(`/members/me/rollingpapers/received?page=${page}&count=${count}`)
      .then((response) => response.data);
  };

  const fetchSentMessage = (page = 0, count = 5) => {
    return appClient
      .get(`/members/me/messages/written?page=${page}&count=${count}`)
      .then((response) => response.data);
  };

  const {
    isLoading: isLoadingGetUserProfile,
    isError: isErrorGetUserProfile,
    error: getUserProfileError,
    data: userProfile,
  } = useQuery<UserInfo>(["user-profile"], () => fetchUserInfo());

  const {
    isLoading: isLoadingGetReceivedRollingpapers,
    isError: isErrorGetReceivedRollingpapers,
    error: getReceivedRollingpapersError,
    data: responseReceivedRollingpapers,
  } = useQuery<ResponseReceivedRollingpapers>(
    ["received-rollingpapers", receivedRollingpapersPage],
    () =>
      fetchReceivedRollingpapers(
        receivedRollingpapersPage,
        contentCountPerPage
      ),
    {
      keepPreviousData: true,
    }
  );

  const {
    isLoading: isLoadingGetSentMessages,
    isError: isErrorGetSentMessages,
    error: getSentMessagesError,
    data: responseSentMessages,
  } = useQuery<ResponseSentMessages>(
    ["sent-messages", sentMessagesCurrentPage],
    () => fetchSentMessage(sentMessagesCurrentPage, contentCountPerPage),
    {
      keepPreviousData: true,
    }
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

  if (!userProfile || !responseReceivedRollingpapers || !responseSentMessages) {
    return <div>에러</div>;
  }

  return (
    <>
      <UserProfile username={userProfile.username} email={userProfile.email} />
      <StyledTabs>
        <MyPageTab
          number={responseReceivedRollingpapers.totalCount}
          text="받은 롤링페이퍼"
          activate={tab === TAB.RECEIVED_PAPER}
          onClick={() => {
            setTab(TAB.RECEIVED_PAPER);
          }}
        />
        <MyPageTab
          number={responseSentMessages.totalCount}
          text="작성한 메시지"
          activate={tab === TAB.SENT_MESSAGE}
          onClick={() => {
            setTab(TAB.SENT_MESSAGE);
          }}
        />
      </StyledTabs>
      {tab === TAB.RECEIVED_PAPER ? (
        <RollingpaperList
          rollingpapers={responseReceivedRollingpapers.rollingpapers}
          currentPage={receivedRollingpapersPage}
          maxPage={Math.ceil(
            responseReceivedRollingpapers.totalCount / contentCountPerPage
          )}
          setCurrentPage={setReceivedRollingpapersPage}
        />
      ) : (
        <MessageList
          messages={responseSentMessages.messages}
          currentPage={sentMessagesCurrentPage}
          maxPage={Math.ceil(
            responseSentMessages.totalCount / contentCountPerPage
          )}
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
