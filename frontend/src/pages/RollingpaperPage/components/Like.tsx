import React, { useState } from "react";
import styled from "@emotion/styled";

import EmptyHeart from "@/assets/icons/bx-heart-empty.svg";
import FilledHeart from "@/assets/icons/bx-heart-fill.svg";

import useUpdateLike from "@/pages/RollingpaperPage/hooks/useUpdateLike";
import useDeleteLiked from "@/pages/RollingpaperPage/hooks/useDeleteLiked";

import { Message } from "@/types";

interface LikeProps extends Pick<Message, "id" | "likes" | "liked"> {}

const Like = ({ id, likes = 0, liked = false }: LikeProps) => {
  const [count, setCount] = useState(likes);
  const [isLiked, setIsLiked] = useState(liked);

  const { updateLike } = useUpdateLike();
  const { deleteLiked } = useDeleteLiked();

  const handleLikeToggle = () => {
    if (!liked) {
      updateLike(id, {
        onSuccess: ({ liked, likes }) => {
          setCount(likes);
          setIsLiked(liked);
        },
      });
    } else {
      deleteLiked(id, {
        onSuccess: ({ liked, likes }) => {
          setCount(likes);
          setIsLiked(liked);
        },
      });
    }
  };

  return (
    <StyledLike>
      {isLiked ? (
        <StyledFilledHeart onClick={handleLikeToggle}>
          <FilledHeart />
        </StyledFilledHeart>
      ) : (
        <StyledEmptyHeart onClick={handleLikeToggle}>
          <EmptyHeart />
        </StyledEmptyHeart>
      )}
      <StyledLikeCount>{count}</StyledLikeCount>
    </StyledLike>
  );
};

const StyledLike = styled.div`
  display: flex;
  align-items: flex-start;
  align-self: flex-end;
  gap: 8px;

  height: 20px;

  color: ${({ theme }) => theme.colors.GRAY_700};
`;

const StyledFilledHeart = styled.div`
  svg {
    fill: ${({ theme }) => theme.colors.RED_300};
  }
  font-size: 20px;
`;

const StyledEmptyHeart = styled.div`
  svg {
    fill: ${({ theme }) => theme.colors.GRAY_700};
  }
  font-size: 20px;
`;

const StyledLikeCount = styled.div`
  width: 20px;
  text-align: center;
`;

export default Like;
