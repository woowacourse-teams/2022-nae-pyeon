import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "@emotion/styled";

import { getMySentMessage } from "@/api/member";

import MessageListItem from "@/pages/MyPage/components/MessageListItem";
import Paging from "@/components/Paging";

import { MYPAGE_MESSAGE_ITEM_COUNT_PER_PAGE } from "@/constants";

import { ResponseSentMessages } from "@/types";

const MessageList = () => {
  const [pageNumber, setPageNumber] = useState(0);

  const { isLoading, isError, error, data } = useQuery<ResponseSentMessages>(
    ["sent-messages", pageNumber],
    () => getMySentMessage(pageNumber, MYPAGE_MESSAGE_ITEM_COUNT_PER_PAGE),
    { keepPreviousData: true }
  );

  if (isError || !data) {
    return <div>에러</div>;
  }

  return (
    <>
      <StyledMessageList>
        {data.messages.map((message) => (
          <MessageListItem {...message} />
        ))}
      </StyledMessageList>
      <StyledPaging>
        <Paging
          maxPage={Math.ceil(
            data.totalCount / MYPAGE_MESSAGE_ITEM_COUNT_PER_PAGE
          )}
          currentPage={pageNumber}
          setCurrentPage={setPageNumber}
        />
      </StyledPaging>
    </>
  );
};

const StyledMessageList = styled.ul`
  display: flex;
  flex-direction: column;
  height: 400px;

  margin-top: 16px;
  gap: 8px;
`;

const StyledPaging = styled.div`
  padding: 20px 0 20px 0;
  display: flex;
  justify-content: center;
`;

export default MessageList;
