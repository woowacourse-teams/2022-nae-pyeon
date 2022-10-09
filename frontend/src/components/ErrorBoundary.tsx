import React from "react";
import axios from "axios";

interface ErrorBoundaryProps {
  children?: React.ReactNode;
  fallback?: React.ReactNode;
}

interface NoErrorState {
  hasError: false;
}

interface CatchErrorState {
  hasError: true;
  errorStatus: "SERVER" | "UNDEFINED";
}

type ErrorBoundaryState = NoErrorState | CatchErrorState;

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  public state: ErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): CatchErrorState {
    if (!axios.isAxiosError(error)) {
      return { hasError: true, errorStatus: "UNDEFINED" };
    }

    const axiosErrorStatus = error?.response?.status;
    if (axiosErrorStatus && axiosErrorStatus >= 500) {
      return { hasError: true, errorStatus: "SERVER" };
    }

    return { hasError: true, errorStatus: "UNDEFINED" };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      this.state = {
        hasError: false,
      };
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
