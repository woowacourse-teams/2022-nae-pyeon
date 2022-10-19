import styled from "@emotion/styled";

interface PageTitleProps {
  title: string;
  titleAlign?: "left" | "right" | "center";
}

const PageTitle = ({ title, titleAlign = "left" }: PageTitleProps) => {
  return <StyledPageTitle titleAlign={titleAlign}>{title}</StyledPageTitle>;
};

const StyledPageTitle = styled.h1<{
  titleAlign: PageTitleProps["titleAlign"];
}>`
  margin-bottom: 18px;
  font-size: 32px;
  text-align: ${({ titleAlign }) => titleAlign};
`;

export default PageTitle;
