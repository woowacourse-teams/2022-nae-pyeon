import styled from "@emotion/styled";

import MessageListItem from "@/pages/MyPage/components/MessageListItem";
import Paging from "@/components/Paging";

import usePaging from "@/hooks/usePaging";

import useReadSentMessages from "@/pages/MyPage/hooks/useReadSentMessages";

import EmptyStateImg from "@/assets/images/empty-state.svg";

interface MessageListProps {
  lastPage: number;
}

const MessageList = ({ lastPage }: MessageListProps) => {
  const { currentPage, handleNumberClick, handleNextClick, handlePrevClick } =
    usePaging(lastPage);

  const { isLoading, data } = useReadSentMessages(currentPage);

  if (!data) {
    return <div>에러</div>;
  }

  if (data.messages.length === 0) {
    return <EmptyState />;
  }

  return (
    <StyledListWithPaging>
      <StyledMessageList>
        {data.messages.map((message) => (
          <MessageListItem {...message} />
        ))}
      </StyledMessageList>
      <StyledPaging>
        <Paging
          currentPage={currentPage}
          lastPage={lastPage}
          handleNumberClick={handleNumberClick}
          handleNextClick={handleNextClick}
          handlePrevClick={handlePrevClick}
        />
      </StyledPaging>
    </StyledListWithPaging>
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

const StyledListWithPaging = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: space-between;
  height: 580px;
`;

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
