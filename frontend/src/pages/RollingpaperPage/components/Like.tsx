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

  const { mutate: updateLiked } = useUpdateLiked();
  const { mutate: deleteLiked } = useDeleteLiked();

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

  width: max-content;
`;

export default Like;
