import React, { PropsWithChildren } from "react";
import styled from "@emotion/styled";
import IconButton from "./IconButton";

import { BiX } from "react-icons/bi";

interface ModalProps {
  onClickCloseButton: React.MouseEventHandler<HTMLButtonElement>;
}

const Modal = ({
  children,
  onClickCloseButton,
}: PropsWithChildren<ModalProps>) => {
  return (
    <>
      <StyledDimmer />
      <StyledModalContainer>
        <StyledCloseButtonWrapper>
          <CloseButton onClick={onClickCloseButton} />
        </StyledCloseButtonWrapper>
        {children}
      </StyledModalContainer>
    </>
  );
};

const CloseButton = ({
  onClick,
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <IconButton type="button" size="small" onClick={onClick}>
      <BiX />
    </IconButton>
  );
};

const StyledDimmer = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  background-color: ${({ theme }) => `${theme.colors.GRAY_100}29`};
  filter: blur(10px);
  backdrop-filter: blur(8px);
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
`;

const StyledCloseButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  padding: 4px;
`;

export default Modal;
