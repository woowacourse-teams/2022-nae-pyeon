import React, { useState } from "react";
import styled from "@emotion/styled";

import EmptyHeart from "@/assets/icons/bx-heart-empty.svg";
import FilledHeart from "@/assets/icons/bx-heart-fill.svg";

import useUpdateLike from "@/pages/RollingpaperPage/hooks/useUpdateLike";
import useDeleteLike from "@/pages/RollingpaperPage/hooks/useDeleteLike";

import { Message } from "@/types";
import IconButton from "@/components/IconButton";

interface LikeProps extends Pick<Message, "id" | "likes" | "liked"> {}

interface StyledLikeContainerProps {
  isLiked: boolean;
}

const Like = ({ id, likes, liked }: LikeProps) => {
  const [count, setCount] = useState(likes);
  const [isLiked, setIsLiked] = useState(liked);

  const { mutate: updateLike } = useUpdateLike();
  const { mutate: deleteLike } = useDeleteLike();

  const handleLikeToggle = () => {
    if (isLiked) {
      deleteLike(id, {
        onSuccess: ({ liked, likes }) => {
          setCount(likes);
          setIsLiked(liked);
        },
      });

      return;
    }

    updateLike(id, {
      onSuccess: ({ liked, likes }) => {
        setCount(likes);
        setIsLiked(liked);
      },
    });
  };

  return (
    <StyledLikeContainer isLiked={isLiked}>
      <IconButton onClick={handleLikeToggle}>
        {isLiked ? <FilledHeart /> : <EmptyHeart />}
      </IconButton>
      <StyledLikeCount>좋아요 {count}개</StyledLikeCount>
    </StyledLikeContainer>
  );
};

const StyledLikeContainer = styled.div<StyledLikeContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;

  color: ${({ theme }) => theme.colors.GRAY_700};

  svg {
    fill: ${(props) =>
      props.isLiked ? props.theme.colors.RED_400 : props.theme.colors.GRAY_700};
    font-size: 28px;
  }
`;

const StyledLikeCount = styled.div`
  position: absolute;
  top: 40px;
  left: 4px;
  font-size: 14px;

  width: max-content;
`;

export default Like;
