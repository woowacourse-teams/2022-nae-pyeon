import styled from "@emotion/styled";
import NotificationItem from "./components/NotificationItem";

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
    <StyledNotificationList>
      {dummy.map((item) => (
        <NotificationItem description={item.description} />
      ))}
    </StyledNotificationList>
  );
};

const StyledNotificationList = styled.ul`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export default NotificationPage;
