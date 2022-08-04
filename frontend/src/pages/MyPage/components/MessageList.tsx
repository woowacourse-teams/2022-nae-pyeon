import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "@emotion/styled";

import { getMySentMessage } from "@/api/member";

import MessageListItem from "@/pages/MyPage/components/MessageListItem";
import Paging from "@/components/Paging";

import EmptyStateImg from "@/assets/images/empty-state.svg";
import { MYPAGE_MESSAGE_PAGING_COUNT } from "@/constants";

import { ResponseSentMessages } from "@/types";

const MessageList = () => {
  const [pageNumber, setPageNumber] = useState(0);

  const { isLoading, isError, error, data } = useQuery<ResponseSentMessages>(
    ["sent-messages", pageNumber],
    () => getMySentMessage(pageNumber, MYPAGE_MESSAGE_PAGING_COUNT),
    { keepPreviousData: true }
  );

  if (isError || !data) {
    return <div>에러</div>;
  }

  if (data.messages.length === 0) {
    return <EmptyState />;
  }

  return (
    <>
      <StyledMessageList>
        {[...data.messages].reverse().map((message) => (
          <MessageListItem {...message} />
        ))}
      </StyledMessageList>
      <StyledPaging>
        <Paging
          maxPage={Math.ceil(data.totalCount / MYPAGE_MESSAGE_PAGING_COUNT)}
          currentPage={pageNumber}
          setCurrentPage={setPageNumber}
        />
      </StyledPaging>
    </>
  );
};

const EmptyState = () => {
  return (
    <StyledEmpty>
      <EmptyStateImg />
      <StyledEmptyMessage>아직 작성한 메시지가 없어요!</StyledEmptyMessage>
    </StyledEmpty>
  );
};

const StyledEmpty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100%;

  margin-top: 30px;
  svg {
    font-size: 150px;
  }
`;

const StyledEmptyMessage = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.GRAY_400};

  margin-bottom: 20px;
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

export default MessageList;
