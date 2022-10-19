import styled from "@emotion/styled";

import PageTitle from "@/components/PageTitle";
import NotificationItem from "@/pages/NotificationPage/components/NotificationItem";
import DeleteAllNotificationButton from "@/pages/NotificationPage/components/DeleteAllNotificationButton";

const dummy = [
  {
    description: `"조조그린 생일 축하" 롤링페이퍼에 새로운 메시지가 작성되었습니다.`,
  },
  {
    description: `"록바 생일 축하" 롤링페이퍼에 새로운 메시지가 작성되었습니다.`,
  },
  {
    description: `"포코 결혼 축하" 롤링페이퍼에 새로운 메시지가 작성되었습니다.`,
  },
];

const NotificationPage = () => {
  return (
    <StyledPageContainer>
      <StyledTopSection>
        <PageTitle title="알림 목록" titleAlign="left" />
        <DeleteAllNotificationButton />
      </StyledTopSection>
      <StyledNotificationList>
        {dummy.map((item) => (
          <NotificationItem description={item.description} />
        ))}
      </StyledNotificationList>
    </StyledPageContainer>
  );
};

const StyledPageContainer = styled.main`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StyledTopSection = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  h1 {
    width: fit-content;
    margin: 0;
  }
`;

const StyledNotificationList = styled.ul`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export default NotificationPage;
