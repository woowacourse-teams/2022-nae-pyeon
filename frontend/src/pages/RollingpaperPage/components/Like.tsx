import React, { useState } from "react";
import styled from "@emotion/styled";

import EmptyHeart from "@/assets/icons/bx-heart-empty.svg";
import FilledHeart from "@/assets/icons/bx-heart-fill.svg";

import useUpdateLiked from "@/pages/RollingpaperPage/hooks/useUpdateLiked";
import useDeleteLiked from "@/pages/RollingpaperPage/hooks/useDeleteLiked";

import { Message } from "@/types";
import IconButton from "@/components/IconButton";

interface LikeProps extends Pick<Message, "id" | "likes" | "liked"> {}

interface StyledLikeContainerProps {
  isLiked: boolean;
}

const Like = ({ id, likes, liked }: LikeProps) => {
  const [count, setCount] = useState(likes);
  const [isLiked, setIsLiked] = useState(liked);

  const { updateLiked } = useUpdateLiked();
  const { deleteLiked } = useDeleteLiked();

  const handleLikeToggle = () => {
    if (isLiked) {
      deleteLiked(id, {
        onSuccess: ({ liked, likes }) => {
          setCount(likes);
          setIsLiked(liked);
        },
      });

      return;
    }

    updateLiked(id, {
      onSuccess: ({ liked, likes }) => {
        setCount(likes);
        setIsLiked(liked);
      },
    });
  };

  return (
    <StyledLikeContainer isLiked={isLiked}>
      {isLiked ? (
        <IconButton onClick={handleLikeToggle}>
          <FilledHeart />
        </IconButton>
      ) : (
        <IconButton onClick={handleLikeToggle}>
          <EmptyHeart />
        </IconButton>
      )}
      <StyledLikeCount>{count}</StyledLikeCount>
    </StyledLikeContainer>
  );
};

const StyledLikeContainer = styled.div<StyledLikeContainerProps>`
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: center;
  gap: 2px;

  padding: 0 16px 0px 4px;

  color: ${({ theme }) => theme.colors.GRAY_700};

  svg {
    fill: ${(props) =>
      props.isLiked ? props.theme.colors.RED_400 : props.theme.colors.GRAY_700};
    font-size: 28px;
  }
`;

const StyledLikeCount = styled.div`
  width: 28px;
  text-align: center;
`;

export default Like;
