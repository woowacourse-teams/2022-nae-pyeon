import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import styled from "@emotion/styled";

import MyPageTab from "@/pages/MyPage/components/MyPageTab";
import UserProfile from "@/pages/MyPage/components/UserProfile";
import RollingpaperList from "@/pages/MyPage/components/RollingpaperList";
import MessageList from "@/pages/MyPage/components/MessageList";

import {
  getMyUserInfo,
  getMyReceivedRollingpapers,
  getMySentMessage,
} from "@/api/member";

import {
  MYPAGE_ROLLINGPAPER_PAGING_COUNT,
  MYPAGE_MESSAGE_PAGING_COUNT,
} from "@/constants";

import {
  UserInfo,
  ResponseSentMessages,
  ResponseReceivedRollingpapers,
  CustomError,
  ValueOf,
} from "@/types";

type TabMode = ValueOf<typeof TAB>;

const TAB = {
  RECEIVED_PAPER: "received_paper",
  SENT_MESSAGE: "sent_message",
} as const;

const MyPage = () => {
  const [tab, setTab] = useState<TabMode>(TAB.RECEIVED_PAPER);

  const {
    isLoading: isLoadingGetUserProfile,
    isError: isErrorGetUserProfile,
    error: getUserProfileError,
    data: userProfile,
  } = useQuery<UserInfo>(["user-profile"], () => getMyUserInfo());

  const {
    isLoading: isLoadingGetReceivedRollingpapers,
    isError: isErrorGetReceivedRollingpapers,
    error: getReceivedRollingpapersError,
    data: responseReceivedRollingpapers,
  } = useQuery<ResponseReceivedRollingpapers>(
    ["received-rollingpapers", 0],
    () => getMyReceivedRollingpapers(0, MYPAGE_ROLLINGPAPER_PAGING_COUNT),
    { keepPreviousData: true }
  );

  const {
    isLoading: isLoadingGetSentMessages,
    isError: isErrorGetSentMessages,
    error: getSentMessagesError,
    data: responseSentMessages,
  } = useQuery<ResponseSentMessages>(
    ["sent-messages", 0],
    () => getMySentMessage(0, MYPAGE_MESSAGE_PAGING_COUNT),
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
          lastPage={Math.ceil(
            responseReceivedRollingpapers.totalCount /
              MYPAGE_ROLLINGPAPER_PAGING_COUNT
          )}
        />
      ) : (
        <MessageList
          lastPage={Math.ceil(
            responseSentMessages.totalCount / MYPAGE_ROLLINGPAPER_PAGING_COUNT
          )}
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
