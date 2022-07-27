import React, { useState } from "react";
import styled from "@emotion/styled";

import MyPageTab from "@/components/MyPageTab";
import ReceivedRollingpaperCard from "@/components/ReceivedRollingpaperCard";
import WrittenMessageCard from "@/components/WrittenMessageCard";
import UserProfile from "@/components/UserProfile";
import Paging from "@/components/Paging";
import { ValueOf } from "@/types";

const rollingpapers = [
  { id: 1, title: "소피아 생일 축하해", teamName: "우테코 4기" },
  { id: 2, title: "소피아 생일 축하해", teamName: "우테코 4기" },
  { id: 3, title: "소피아 생일 축하해", teamName: "우테코 4기" },
  { id: 4, title: "소피아 생일 축하해", teamName: "우테코 4기" },
  { id: 5, title: "소피아 생일 축하해", teamName: "우테코 4기" },
];

const messages = [
  {
    id: 1,
    rollingpaperTitle: "소피아의 생일을 축하해",
    to: "소피아",
    team: "우테코 4기",
    content:
      "소피아야 생일 축하해~ 축카추카추 소피아야 생일 축하해~ 축카추카추",
    color: "#C5FF98",
  },
  {
    id: 2,
    rollingpaperTitle: "소피아의 생일을 축하해",
    to: "소피아",
    team: "우테코 4기",
    content:
      "소피아야 생일 축하해~ 축카추카추 소피아야 생일 축하해~ 축카추카추",
    color: "#C5FF98",
  },
  {
    id: 3,
    rollingpaperTitle: "소피아의 생일을 축하해",
    to: "소피아",
    team: "우테코 4기",
    content:
      "소피아야 생일 축하해~ 축카추카추 소피아야 생일 축하해~ 축카추카추",
    color: "#FF8181",
  },
  {
    id: 4,
    rollingpaperTitle: "소피아의 생일을 축하해",
    to: "소피아",
    team: "우테코 4기",
    content:
      "소피아야 생일 축하해~ 축카추카추 소피아야 생일 축하해~ 축카추카추",
    color: "#C5FF98",
  },
  {
    id: 5,
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
  SEND_MESSAGE: "send_message",
} as const;

type TabMode = ValueOf<typeof TAB>;

const MyPage = () => {
  const [tab, setTab] = useState<TabMode>(TAB.RECEIVED_PAPER);
  const [receivedCurrentPage, setReceivedCurrentPage] = useState(1);
  const [writtenCurrentPage, setWrittenCurrentPage] = useState(1);

  return (
    <div>
      <UserProfile name="도리" email="sunho620@naver.com" />
      <StyledCounters>
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
          activate={tab === TAB.SEND_MESSAGE}
          onClick={() => {
            setTab(TAB.SEND_MESSAGE);
          }}
        />
      </StyledCounters>
      {tab === TAB.RECEIVED_PAPER ? (
        <>
          <StyledRollingpaperList>
            {rollingpapers.map(({ title, teamName, id }) => (
              <li key={id}>
                <ReceivedRollingpaperCard title={title} teamName={teamName} />
              </li>
            ))}
          </StyledRollingpaperList>
          <StyledPaging>
            <Paging
              currentPage={receivedCurrentPage}
              maxPage={10}
              setCurrentPage={setReceivedCurrentPage}
            />
          </StyledPaging>
        </>
      ) : (
        <>
          <StyledMessageList>
            {messages.map(
              ({ id, rollingpaperTitle, to, team, content, color }) => (
                <li key={id}>
                  <WrittenMessageCard
                    rollingpaperTitle={rollingpaperTitle}
                    to={to}
                    team={team}
                    content={content}
                    color={color}
                  />
                </li>
              )
            )}
          </StyledMessageList>
          <StyledPaging>
            <Paging
              currentPage={writtenCurrentPage}
              maxPage={10}
              setCurrentPage={setWrittenCurrentPage}
            />
          </StyledPaging>
        </>
      )}
    </div>
  );
};

const StyledCounters = styled.div`
  display: flex;

  border-top: 1px solid ${({ theme }) => theme.colors.GRAY_400};
  border-bottom: 1px solid ${({ theme }) => theme.colors.GRAY_400};

  padding: 12px;
  gap: 20px;
`;

const StyledRollingpaperList = styled.ul`
  display: flex;
  flex-direction: column;

  margin-top: 16px;
  gap: 8px;
`;

const StyledMessageList = styled.ul`
  display: flex;
  flex-direction: column;

  margin-top: 16px;
  gap: 8px;
`;

const StyledPaging = styled.div`
  padding: 20px 0 20px 0;
  display: flex;
  justify-content: center;
`;

export default MyPage;
