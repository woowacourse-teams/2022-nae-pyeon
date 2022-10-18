import React, { useState } from "react";
import styled from "@emotion/styled";

import useValidateParam from "@/hooks/useValidateParam";

import useUpdateLike from "@/pages/RollingpaperPage/hooks/useUpdateLike";
import useDeleteLike from "@/pages/RollingpaperPage/hooks/useDeleteLike";

import IconButton from "@/components/IconButton";

import EmptyHeart from "@/assets/icons/bx-heart-empty.svg";
import FilledHeart from "@/assets/icons/bx-heart-fill.svg";

import { Message } from "@/types";

interface LikeProps extends Pick<Message, "id" | "likes" | "liked"> {}

interface StyledLikeContainerProps {
  isLiked: boolean;
}

const Like = ({ id, likes, liked }: LikeProps) => {
  const rollingpaperId = useValidateParam<number>("rollingpaperId");

  const [count, setCount] = useState(likes);
  const [isLiked, setIsLiked] = useState(liked);

  const { mutate: updateLike } = useUpdateLike();
  const { mutate: deleteLike } = useDeleteLike();

  const handleLikeToggle = () => {
    if (isLiked) {
      deleteLike(
        { rollingpaperId, id },
        {
          onSuccess: ({ liked, likes }) => {
            setCount(likes);
            setIsLiked(liked);
          },
        }
      );

      return;
    }

    updateLike(
      { rollingpaperId, id },
      {
        onSuccess: ({ liked, likes }) => {
          setCount(likes);
          setIsLiked(liked);
        },
      }
    );
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
