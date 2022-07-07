import React from "react";
import styled from "@emotion/styled";

import { BiPencil, BiTrash } from "react-icons/bi";

import IconButton from "./IconButton";

interface RollingpaperMessageDetailProps {
  content: string;
  author: string;
  handleDeleteButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleEditButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const RollingpaperMessageDetail = ({
  content,
  author,
  handleDeleteButtonClick,
  handleEditButtonClick,
}: RollingpaperMessageDetailProps) => {
  return (
    <StyledMessage>
      <StyledContent>{content}</StyledContent>

      <StyledBottom>
        <StyledMenu>
          <IconButton size="small" onClick={handleEditButtonClick}>
            <BiPencil />
          </IconButton>
          <IconButton size="small" onClick={handleDeleteButtonClick}>
            <BiTrash />
          </IconButton>
        </StyledMenu>

        <StyledAuthor>{author}</StyledAuthor>
      </StyledBottom>
    </StyledMessage>
  );
};

const StyledMessage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 300px;
  min-height: 300px;

  padding: 20px;

  border: none;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.LIGHT_GREEN_200};

  @media only screen and (min-width: 960px) {
    width: 600px;
    min-height: 400px;
  }
`;

const StyledContent = styled.div`
  height: 90%;

  white-space: pre-wrap;
`;

const StyledBottom = styled.div`
  height: 10%;
  margin-top: 20px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledMenu = styled.div`
  display: flex;
  gap: 10px;
`;

const StyledAuthor = styled.div``;

export default RollingpaperMessageDetail;
