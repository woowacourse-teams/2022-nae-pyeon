import React from "react";
import styled from "@emotion/styled";

import { BiPencil, BiTrash } from "react-icons/bi";

import IconButton from "./IconButton";

interface RollingpaperMessageDetailProps {
  content: string;
  author: string;
}

const RollingpaperMessageDetail = ({
  content,
  author,
}: RollingpaperMessageDetailProps) => {
  return (
    <StyledMessage>
      <StyledContent>{content}</StyledContent>

      <StyledBottom>
        <StyledMenu>
          <IconButton size="small">
            <BiPencil />
          </IconButton>
          <IconButton size="small">
            <BiTrash />
          </IconButton>
        </StyledMenu>

        <StyledAuthor>{author}</StyledAuthor>
      </StyledBottom>
    </StyledMessage>
  );
};

const StyledContent = styled.div`
  height: 90%;
`;

const StyledMenu = styled.div`
  display: flex;
  gap: 10px;
`;

const StyledAuthor = styled.div``;

const StyledBottom = styled.div`
  height: 10%;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledMessage = styled.div`
  width: 300px;
  height: 300px;

  padding: 20px;

  border: none;
  border-radius: 8px;
  background-color: #c5ff98;

  @media only screen and (min-width: 960px) {
    width: 600px;
    height: 400px;
  }
`;

export default RollingpaperMessageDetail;
