import { Team } from "@/types";
import styled from "@emotion/styled";

interface MyTeamCardProps
  extends Pick<Team, "id" | "name" | "description" | "emoji" | "color"> {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  selected?: boolean;
}

interface StyledMyTeamCardProps {
  color: string;
  selected?: boolean;
}

interface StyledMyTeamCardEmojiProps {
  color: string;
}

const MyTeamCard = ({
  name,
  description,
  emoji,
  color,
  onClick,
  selected,
}: MyTeamCardProps) => {
  return (
    <StyledMyTeamCard color={color} onClick={onClick} selected={selected}>
      <StyledEmoji color={color}>{emoji}</StyledEmoji>
      <StyledName>{name}</StyledName>
      <StyledDescription>{description}</StyledDescription>
    </StyledMyTeamCard>
  );
};

const StyledMyTeamCard = styled.div<StyledMyTeamCardProps>`
  display: flex;
  flex-direction: column;

  width: 140px;
  height: 190px;

  padding: 18px 14px;

  background-color: ${(props) => `${props.color}AB`};
  border-radius: 8px;

  transition-duration: 0.3s;

  border: ${(props) =>
    props.selected && `solid 4px ${props.theme.colors.PURPLE_400}`};

  cursor: pointer;

  &:hover {
    transform: scale(1.02);
    transition: transform 0.3s ease;
  }

  @media only screen and (min-width: 600px) {
    width: 160px;
    height: 210px;

    padding: 20px 14px;
  }

  @media only screen and (min-width: 600px) {
    width: 200px;
    height: 250px;

    padding: 24px 16px;
  }

  @media only screen and (min-width: 960px) {
    width: 220px;
    height: 290px;

    padding: 24px 20px;
  }
`;

const StyledEmoji = styled.div<StyledMyTeamCardEmojiProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 50px;
  height: 50px;

  border-radius: 8px;
  background-color: ${(props) => `${props.color}`};

  font-size: 30px;
`;

const StyledName = styled.h2`
  margin-top: 20px;

  font-size: 24px;
  font-weight: 600;

  overflow: hidden;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;

  @media only screen and (min-width: 960px) {
    margin: 28px 0 8px 0;
    -webkit-line-clamp: 2;
  }
`;

const StyledDescription = styled.div`
  margin-top: 4px;

  font-size: 12px;
  color: ${({ theme }) => theme.colors.GRAY_700};

  overflow: hidden;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;

  @media only screen and (min-width: 600px) {
    font-size: 14px;
    -webkit-line-clamp: 4;
  }
`;

export default MyTeamCard;
