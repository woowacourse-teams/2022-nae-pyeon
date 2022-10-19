import React from "react";
import styled from "@emotion/styled";

interface RollingpaperListItemProps {
  title: string;
  to: string;
}

const RollingpaperListItem = ({ title, to }: RollingpaperListItemProps) => {
  return (
    <StyledRollingpaperListItem>
      <StyledTitle>{title}</StyledTitle>
      <StyledTo>to. {to}</StyledTo>
    </StyledRollingpaperListItem>
  );
};

const StyledRollingpaperListItem = styled.li`
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

const StyledTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const StyledTo = styled.div`
  font-size: 14px;
`;

export default RollingpaperListItem;
