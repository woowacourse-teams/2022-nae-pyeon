import React, { useContext } from "react";
import ReactDom from "react-dom";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

import { SnackbarContext } from "@/context/SnackbarContext";

const Snackbar = () => {
  const { message } = useContext(SnackbarContext);

  return ReactDom.createPortal(
    <StyledSnackbar>{message}</StyledSnackbar>,
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

  width: 250px;

  background-color: ${({ theme }) => theme.colors.GRAY_700};

  color: ${({ theme }) => theme.colors.WHITE};

  animation: ${fadein} 0.5s;
`;

export default Snackbar;
