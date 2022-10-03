import React, { Component, PropsWithChildren, ReactNode } from "react";
import { AxiosError } from "axios";
import WithSnackbarAndNavigate from "./WithSnackbarAndNavigate";
import { ValueOf } from "@/types";

interface ErrorBoundaryProps {
  fallback: (onReset: () => void) => ReactNode;
  openSnackbar: (message: string) => void;
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
    console.log(error);

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
    const status = error.response?.status;
    const code = error.response?.data.errorCode;
    const message = error.response?.data.message;

    console.log(this.state);

    if (message) {
      this.props.openSnackbar(message);
    }

    // 로그인 페이지로 이동

    // 정의된 페이지로 이동
  }

  public render() {
    switch (this.state.status) {
      case ERROR_STATUS.UNAUTHORIZED: // 로그인 페이지로 navigate
      case ERROR_STATUS.FORBIDDEN: // 정의된 페이지로 navigate
      case ERROR_STATUS.SERVER_ERROR: // 에러 페이지로 이동
      case ERROR_STATUS.UNDEFINED: // 에러 페이지로 이동
        return this.props.fallback(() => {
          this.setState({
            status: ERROR_STATUS.NOT_ERROR,
            code: undefined,
            message: undefined,
            requestUrl: undefined,
          });
        });

      default: // 에러 상태가 아닐 때
        return this.props.children;
    }
  }
}

export default WithSnackbarAndNavigate(ErrorBoundary);
