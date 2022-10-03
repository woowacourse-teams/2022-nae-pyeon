import React, { Component, PropsWithChildren, ReactNode } from "react";
import { AxiosError } from "axios";
import WithSnackbar from "./WithSnackbar";

interface ErrorBoundaryProps {
  fallback: (onReset: () => void) => ReactNode;
  openSnackbar: (message: string) => void;
}

interface ErrorBoundaryStates {
  status: "Not Error" | "Unauthorized" | "Server Error" | "Undeclared";
  code?: number;
  message?: string;
}

class ErrorBoundary extends Component<
  PropsWithChildren<ErrorBoundaryProps>,
  ErrorBoundaryStates
> {
  public state: ErrorBoundaryStates = {
    status: "Not Error",
    code: undefined,
    message: undefined,
  };

  public static getDerivedStateFromError(
    error: AxiosError<{ errorCode: string; message: string }>
  ): ErrorBoundaryStates {
    const newErrorState = {
      code: Number(error.response?.data.errorCode),
      message: error.response?.data.message,
    };

    switch (error.response?.status) {
      case 401:
      case 403:
        return {
          ...newErrorState,
          status: "Unauthorized",
        };

      case 500:
        return {
          ...newErrorState,
          status: "Server Error",
        };

      default:
        return {
          ...newErrorState,
          status: "Undeclared",
        };
    }
  }

  public componentDidCatch(
    error: AxiosError<{ errorCode: string; message: string }>
  ) {
    const status = error.response?.status;
    const code = error.response?.data.errorCode;
    const message = error.response?.data.message;

    if (message) {
      this.props.openSnackbar(message);
    }
  }

  public render() {
    switch (this.state.status) {
      case "Unauthorized":
      case "Server Error":
      case "Undeclared":
        return this.props.fallback(() => {
          this.setState({
            status: "Not Error",
            code: undefined,
            message: undefined,
          });
        });

      default:
        return this.props.children;
    }
  }
}

export default WithSnackbar(ErrorBoundary);
