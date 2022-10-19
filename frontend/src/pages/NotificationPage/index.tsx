import styled from "@emotion/styled";

import PageTitle from "@/components/PageTitle";
import NotificationItem from "@/pages/NotificationPage/components/NotificationItem";
import useDeleteNotificationsAll from "./hooks/useDeleteNotificationAll";
import LineButton from "@/components/LineButton";
import useReadNotifications from "@/hooks/useReadNotifications";
import Loading from "@/components/Loading";

const NotificationPage = () => {
  const { data, isLoading } = useReadNotifications();
  const { mutate: deleteNotificationAll } = useDeleteNotificationsAll();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <StyledPageContainer>
      <StyledTopSection>
        <PageTitle title="알림 목록" titleAlign="left" />
        <LineButton
          onClick={() => {
            deleteNotificationAll();
          }}
        >
          전체 알림 삭제
        </LineButton>
      </StyledTopSection>
      <StyledNotificationList>
        {data?.notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
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
