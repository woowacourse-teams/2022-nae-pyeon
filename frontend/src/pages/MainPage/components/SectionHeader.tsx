import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

interface SectionHeaderAttributes {
  title: string;
  count?: number;
  moreLink?: string;
}

const SectionHeader = ({ title, count, moreLink }: SectionHeaderAttributes) => {
  const navigate = useNavigate();
  return (
    <StyledSectionHeader>
      <StyledTitleWithCount>
        <StyledTitle>{title}</StyledTitle>
        {count && <StyledCount>{count}</StyledCount>}
      </StyledTitleWithCount>
      {moreLink && (
        <StyledMore onClick={() => navigate(`${moreLink}`)}>더보기</StyledMore>
      )}
    </StyledSectionHeader>
  );
};

const StyledSectionHeader = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 10px;
  margin-bottom: 10px;
`;

const StyledTitleWithCount = styled.div`
  display: flex;

  align-items: flex-end;
  gap: 8px;
`;

const StyledTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
`;

const StyledCount = styled.div`
  color: ${({ theme }) => theme.colors.GRAY_500};
`;

const StyledMore = styled.button`
  color: ${({ theme }) => theme.colors.GRAY_500};

  &:hover {
    color: ${({ theme }) => theme.colors.GRAY_600};
  }
`;

export default SectionHeader;
