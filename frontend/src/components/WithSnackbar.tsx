import React from "react";
import { useSnackbar } from "@/context/SnackbarContext";

const WithSnackbar = (Component: React.ComponentType<any>) => {
  return (props: any) => {
    const { openSnackbar } = useSnackbar();
    return <Component {...props} openSnackbar={openSnackbar} />;
  };
};

export default WithSnackbar;
