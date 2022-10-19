import React from "react";
import ReactDom from "react-dom";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

import { useSnackbar } from "@/context/SnackbarContext";

const Snackbar = () => {
  const { message } = useSnackbar();

  return ReactDom.createPortal(
    <StyledSnackbar role={"status"}>{message}</StyledSnackbar>,
    document.getElementById("snackbar__root")!
  );
};

const fadein = keyframes`
    from {
      bottom: 0;
      opacity: 0;
    }
    to {
      bottom: 20px;
      opacity: 1;
    }
`;

const StyledSnackbar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;

  bottom: 20px;
  left: 50%;
  margin-left: -125px;
  padding: 8px;
  z-index: 9999;

  width: 250px;

  background-color: ${({ theme }) => theme.colors.GRAY_700};

  color: ${({ theme }) => theme.colors.WHITE};

  animation: ${fadein} 0.5s;
`;

export default Snackbar;
