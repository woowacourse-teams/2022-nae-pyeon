import React, { Component, PropsWithChildren, ReactNode } from "react";
import { AxiosError } from "axios";

import WithSnackbarAndNavigate from "./WithSnackbarAndNavigate";
import { ValueOf } from "@/types";

interface ErrorBoundaryProps {
  fallback: (onReset: () => void) => ReactNode;
  openSnackbar: (message: string) => void;
  navigate: any;
}

const ERROR_STATUS = {
  NOT_ERROR: "Not Error",
  UNAUTHORIZED: "Unauthorized",
  FORBIDDEN: "Forbidden",
  SERVER_ERROR: "Server Error",
  UNDEFINED: "Undefined",
} as const;

interface ErrorBoundaryStates {
  status: ValueOf<typeof ERROR_STATUS>;
  code?: number;
  message?: string;
  requestUrl?: string;
}

class ErrorBoundary extends Component<
  PropsWithChildren<ErrorBoundaryProps>,
  ErrorBoundaryStates
> {
  public state: ErrorBoundaryStates = {
    status: ERROR_STATUS.NOT_ERROR,
    code: undefined,
    message: undefined,
    requestUrl: undefined,
  };

  public static getDerivedStateFromError(
    error: AxiosError<{ errorCode: string; message: string }>
  ): ErrorBoundaryStates {
    const newErrorState = {
      code: Number(error.response?.data.errorCode),
      message: error.response?.data.message,
      requestUrl: error.config.url,
    };

    switch (error.response?.status) {
      case 401:
        return {
          ...newErrorState,
          status: ERROR_STATUS.UNAUTHORIZED,
        };

      case 403:
        return {
          ...newErrorState,
          status: ERROR_STATUS.FORBIDDEN,
        };

      case 500:
        return {
          ...newErrorState,
          status: ERROR_STATUS.SERVER_ERROR,
        };

      default:
        return {
          ...newErrorState,
          status: ERROR_STATUS.UNDEFINED,
        };
    }
  }

  public componentDidCatch(
    error: AxiosError<{ errorCode: string; message: string }>
  ) {
    const { status, code, message, requestUrl } = this.state;

    if (message) {
      this.props.openSnackbar(message);
    }

    // navigate
    if (status === ERROR_STATUS.UNAUTHORIZED) {
      this.setState({
        status: ERROR_STATUS.NOT_ERROR,
        code: undefined,
        message: undefined,
        requestUrl: undefined,
      });
      this.props.navigate("/login");
      return;
    }

    const paths = requestUrl?.split("/");
    const teamsIndex = paths?.indexOf("teams");

    switch (code) {
      case 4013:
        this.setState({
          status: ERROR_STATUS.NOT_ERROR,
          code: undefined,
          message: undefined,
          requestUrl: undefined,
        });
        paths &&
          teamsIndex &&
          this.props.navigate(`/team/${paths[teamsIndex + 1]}`);
    }
  }

  public render() {
    switch (this.state.status) {
      case ERROR_STATUS.UNAUTHORIZED:
      case ERROR_STATUS.FORBIDDEN:
      case ERROR_STATUS.SERVER_ERROR:
      case ERROR_STATUS.UNDEFINED:
        return this.props.fallback(() => {
          this.setState({
            status: ERROR_STATUS.NOT_ERROR,
            code: undefined,
            message: undefined,
            requestUrl: undefined,
          });
        });

      default:
        return this.props.children;
    }
  }
}

export default WithSnackbarAndNavigate(ErrorBoundary);
