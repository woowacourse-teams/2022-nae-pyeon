import React from "react";
import styled from "@emotion/styled";

import Modal from "@/components/Modal";

import CopyIcon from "@/assets/icons/bx-copy.svg";
import IconButton from "@/components/IconButton";

import copyClipboard from "@/util/copyClipboard";
import { useSnackbar } from "@/context/SnackbarContext";

interface InviteModalProp {
  onClickClose: () => void;
}

const InviteModal = ({ onClickClose }: InviteModalProp) => {
  const { openSnackbar } = useSnackbar();
  const link = "http://djslfjslfjsdlkfjsldkf";

  const handleCopyButton =
    (link: string): React.MouseEventHandler =>
    (e) => {
      e.preventDefault();

      copyClipboard(
        link,
        () => openSnackbar("초대 링크가 복사되었습니다"),
        () => openSnackbar("초대 링크가 복사에 실패했습니다")
      );
    };

  return (
    <Modal onClickCloseButton={onClickClose}>
      <StyledInvite>
        <StyledHeader>모임 초대하기</StyledHeader>
        <div>모임에 초대하려면 아래 링크를 공유하세요</div>
        <StyledLinkCopy>
          <StyledLink>{link}</StyledLink>
          <IconButton size="small" onClick={handleCopyButton(link)}>
            <CopyIcon />
          </IconButton>
        </StyledLinkCopy>
      </StyledInvite>
    </Modal>
  );
};

const StyledInvite = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledHeader = styled.h2`
  font-size: 32px;
  font-weight: 600;
  margin: 20px 0;
`;

const StyledLinkCopy = styled.div`
  display: flex;
  gap: 8px;

  margin: 8px 0 20px 0;

  svg {
    fill: ${({ theme }) => theme.colors.GRAY_500};
  }
`;

const StyledLink = styled.a`
  color: ${({ theme }) => theme.colors.SKY_BLUE_400};
`;

export default InviteModal;
