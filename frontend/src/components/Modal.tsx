import React, { PropsWithChildren } from "react";
import ReactDom from "react-dom";
import styled from "@emotion/styled";
import IconButton from "./IconButton";

import XIcon from "@/assets/icons/bx-x.svg";

interface ModalProps {
  onClickCloseButton: React.MouseEventHandler;
}

const Modal = ({
  children,
  onClickCloseButton,
}: PropsWithChildren<ModalProps>) => {
  return ReactDom.createPortal(
    <>
      <StyledDimmer onClick={onClickCloseButton} />
      <StyledModalContainer>
        <StyledCloseButtonWrapper>
          <CloseButton onClick={onClickCloseButton} />
        </StyledCloseButtonWrapper>
        {children}
      </StyledModalContainer>
    </>,
    document.getElementById("modal__root")!
  );
};

const CloseButton = ({
  onClick,
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <IconButton type="button" size="small" onClick={onClick}>
      <XIcon />
    </IconButton>
  );
};

const StyledDimmer = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  background-color: ${({ theme }) => `${theme.colors.GRAY_700}66`};
  backdrop-filter: blur(1px);

  z-index: 99;
`;

const StyledModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 28px;

  width: 50%;
  min-width: 240px;

  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0px 4px 4px 2px rgba(147, 147, 147, 0.25);

  z-index: 99;
`;

const StyledCloseButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  padding: 10px;
`;

export default Modal;
