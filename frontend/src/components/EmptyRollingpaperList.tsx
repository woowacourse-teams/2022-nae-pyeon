import styled from "@emotion/styled";

import EmptyStateImg from "@/assets/images/empty-state.svg";

const EmptyRollingpaperList = () => {
  return (
    <StyledEmpty>
      <EmptyStateImg />
      <StyledEmptyMessage>아직 받은 롤링페이퍼가 없어요!</StyledEmptyMessage>
    </StyledEmpty>
  );
};

const StyledEmpty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

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

export default EmptyRollingpaperList;
