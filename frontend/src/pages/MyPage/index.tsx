import { useState } from "react";
import styled from "@emotion/styled";

import useReadUserProfile from "@/hooks/api/member/useReadUserProfile";
import useReadSentMessages from "@/hooks/api/member/useReadSentMessages";
import useReadReceivedRollingpapers from "@/hooks/api/member/useReadReceivedRollingpapers";

import Loading from "@/components/Loading";
import MyPageTab from "@/pages/MyPage/components/MyPageTab";
import UserProfile from "@/pages/MyPage/components/UserProfile";
import RollingpaperList from "@/pages/MyPage/components/RollingpaperList";
import MessageList from "@/pages/MyPage/components/MessageList";

import {
  MYPAGE_ROLLINGPAPER_PAGING_COUNT,
  MYPAGE_MESSAGE_PAGING_COUNT,
} from "@/constants";

import { ValueOf } from "@/types";

type TabMode = ValueOf<typeof TAB>;

const TAB = {
  RECEIVED_PAPER: "received_paper",
  SENT_MESSAGE: "sent_message",
} as const;

const MyPage = () => {
  const [tab, setTab] = useState<TabMode>(TAB.RECEIVED_PAPER);

  const { isLoading: isLoadingGetUserProfile, data: userProfile } =
    useReadUserProfile();

  const {
    isLoading: isLoadingGetReceivedRollingpapers,
    data: responseReceivedRollingpapers,
  } = useReadReceivedRollingpapers();

  const { isLoading: isLoadingGetSentMessages, data: responseSentMessages } =
    useReadSentMessages();

  if (
    isLoadingGetUserProfile ||
    isLoadingGetReceivedRollingpapers ||
    isLoadingGetSentMessages ||
    !userProfile ||
    !responseReceivedRollingpapers ||
    !responseSentMessages
  ) {
    return <Loading />;
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
            responseSentMessages.totalCount / MYPAGE_MESSAGE_PAGING_COUNT
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
