import React from "react";
import { useSnackbar } from "@/context/SnackbarContext";
import { useNavigate } from "react-router-dom";

const WithSnackbarAndNavigate = (Component: React.ComponentType<any>) => {
  return (props: any) => {
    const { openSnackbar } = useSnackbar();
    const navigate = useNavigate();
    return (
      <Component {...props} openSnackbar={openSnackbar} navigate={navigate} />
    );
  };
};

export default WithSnackbarAndNavigate;
