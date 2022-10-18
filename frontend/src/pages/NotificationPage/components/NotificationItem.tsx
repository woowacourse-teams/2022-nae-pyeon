import styled from "@emotion/styled";

interface NotificationItemProps {
  description: string;
}

const NotificationItem = ({ description }: NotificationItemProps) => {
  return (
    <StyledNotificationItem>
      <StyledDescription>{description}</StyledDescription>
    </StyledNotificationItem>
  );
};

const StyledNotificationItem = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 70px;
  padding: 0 16px;

  background-color: ${({ theme }) => theme.colors.WHITE};
  box-shadow: 0px 4px 4px 4px ${({ theme }) => theme.colors.BOX_SHADOW};
  border-radius: 8px;
`;

const StyledDescription = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

export default NotificationItem;
