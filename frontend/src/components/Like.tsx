import React, { useState } from "react";
import styled from "@emotion/styled";

import EmptytHeart from "@/assets/icons/bx-heart-empty.svg";
import FilledHeart from "@/assets/icons/bx-heart-fill.svg";

interface LikeProps {
  count: number;
}

const Like = ({ count }: LikeProps) => {
  const [liked, setLiked] = useState(false);

  const handleLikeToggle = () => {
    setLiked((prev) => !prev);
  };

  return (
    <StyledLike>
      {liked ? (
        <StyledFilledHeart onClick={handleLikeToggle}>
          <FilledHeart />
        </StyledFilledHeart>
      ) : (
        <StyledEmptyHeart onClick={handleLikeToggle}>
          <EmptytHeart />
        </StyledEmptyHeart>
      )}
      <div>{count}</div>
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

export default Like;
