import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

import { useSnackbar } from "@/context/SnackbarContext";

import { ApiErrorResponse } from "@/types/api";

interface CustomError {
  message: string;
  errorCode: number;
}

const useApiErrorHandler = () => {
  const { openSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const unauthorizedErrorHandler = () => {
    navigate("/logout");
    openSnackbar(`로그인이 만료되었습니다. 다시 로그인 해주세요.`);
  };

  const forbiddenErrorHandler = (customErrorInfo: CustomError) => {
    navigate(`/`);
    openSnackbar(customErrorInfo.message);
  };

  const defaultErrorHandler = (errorMessage: CustomError["message"]) => {
    openSnackbar(errorMessage);
  };

  const apiErrorHandler = (error: AxiosError<ApiErrorResponse>): void => {
    const { status, data } = error.response!;
    const customErrorInfo = {
      ...data!,
      errorCode: Number(data!.errorCode),
    };

    switch (status) {
      case 401: // Unauthorized
        unauthorizedErrorHandler();
        break;
      case 403: // Forbidden
        forbiddenErrorHandler(customErrorInfo);
        break;
      default:
        defaultErrorHandler(customErrorInfo.message);
    }

    return;
  };

  return apiErrorHandler;
};

export default useApiErrorHandler;
