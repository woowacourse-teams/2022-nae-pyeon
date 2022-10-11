import React, { useState } from "react";
import styled from "@emotion/styled";

import EmptyHeart from "@/assets/icons/bx-heart-empty.svg";
import FilledHeart from "@/assets/icons/bx-heart-fill.svg";
import useUpdateLike from "../hooks/useUpdateLike";
import useDeleteLiked from "../hooks/useDeleteLiked";

interface LikeProps {
  id: number;
  count: number;
  like: boolean;
}

const Like = ({ id, count = 0, like = false }: LikeProps) => {
  const [liked, setLiked] = useState(like);
  const [likes, setLikes] = useState(count);

  const { updateLike } = useUpdateLike();
  const { deleteLiked } = useDeleteLiked();

  const handleLikeToggle = () => {
    if (!liked) {
      updateLike(id, {
        onSuccess: ({ liked, likes }) => {
          setLiked(liked);
          setLikes(likes);
        },
      });
    } else {
      deleteLiked(id, {
        onSuccess: ({ liked, likes }) => {
          setLiked(liked);
          setLikes(likes);
        },
      });
    }
  };

  return (
    <StyledLike>
      {liked ? (
        <StyledFilledHeart onClick={handleLikeToggle}>
          <FilledHeart />
        </StyledFilledHeart>
      ) : (
        <StyledEmptyHeart onClick={handleLikeToggle}>
          <EmptyHeart />
        </StyledEmptyHeart>
      )}
      <StyledLikeCount>{likes}</StyledLikeCount>
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
