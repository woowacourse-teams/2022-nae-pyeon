import styled from "@emotion/styled";

import { useSnackbar } from "@/context/SnackbarContext";

import PageTitle from "@/components/PageTitle";
import NotificationItem from "@/pages/NotificationPage/components/NotificationItem";
import useDeleteNotificationsAll from "./hooks/useDeleteNotificationAll";
import LineButton from "@/components/LineButton";
import useReadNotifications from "@/hooks/useReadNotifications";
import Loading from "@/components/Loading";

import EmptyStateImg from "@/assets/images/empty-state.svg";

const NotificationPage = () => {
  const { openSnackbar } = useSnackbar();

  const { data, isLoading } = useReadNotifications({});
  const { mutate: deleteNotificationAll } = useDeleteNotificationsAll();

  if (isLoading) {
    return <Loading />;
  }

  const NotificationListEmptyState = () => {
    return (
      <StyledEmpty>
        <EmptyStateImg />
        <StyledEmptyMessage>받은 알림이 없습니다.</StyledEmptyMessage>
      </StyledEmpty>
    );
  };

  const NotificationList = () => {
    if (data?.notifications.length === 0) {
      return <NotificationListEmptyState />;
    }

    return (
      <StyledNotificationList>
        {data?.notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </StyledNotificationList>
    );
  };

  return (
    <StyledPageContainer>
      <StyledTopSection>
        <PageTitle title="알림 목록" titleAlign="left" />
        <LineButton
          onClick={() => {
            if (data?.notifications.length === 0) {
              openSnackbar("삭제할 알림이 없어요!");
              return;
            }
            deleteNotificationAll();
          }}
        >
          전체 알림 삭제
        </LineButton>
      </StyledTopSection>
      <NotificationList />
    </StyledPageContainer>
  );
};

const StyledPageContainer = styled.main`
  display: flex;
  flex-direction: column;
  gap: 20px;

  height: calc(100vh - 100px);
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

const StyledEmpty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin: 10vh 0;

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

export default NotificationPage;
