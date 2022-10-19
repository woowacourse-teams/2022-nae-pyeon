import styled from "@emotion/styled";

import SurpriseStateImg from "@/assets/images/surprise-state.svg";

const EmptyTeamRollingpaper = () => {
  return (
    <StyledEmpty>
      <SurpriseStateImg />
      <StyledEmptyMessage>첫 롤링페이퍼를 만들어주세요!</StyledEmptyMessage>
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
    font-size: 170px;
  }
`;

const StyledEmptyMessage = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.GRAY_400};

  margin-bottom: 20px;
`;

export default EmptyTeamRollingpaper;
