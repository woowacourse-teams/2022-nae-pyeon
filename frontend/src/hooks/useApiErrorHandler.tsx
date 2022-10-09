import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

import { useSnackbar } from "@/context/SnackbarContext";

import { ApiErrorResponse } from "@/types/api";

const useApiErrorHandler = () => {
  const { openSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const unauthorizedErrorHandler = () => {
    navigate("logout");
    openSnackbar(`로그인이 만료되었습니다. 다시 로그인 해주세요.`);
  };

  const forbiddenErrorHandler = (error: AxiosError<ApiErrorResponse>) => {
    const customErrorInfo = error.response!.data!;

    switch (customErrorInfo.errorCode) {
      case 4013: {
        const requestUrl = error.config.url!;
        const requestUrlPaths = requestUrl.split("/");
        const teamId = requestUrlPaths.indexOf("teams") + 1;

        navigate(`/team/${teamId}`);
        openSnackbar(customErrorInfo.message);
        break;
      }
      default:
        openSnackbar(customErrorInfo.message);
    }
  };

  const defaultErrorHandler = (errorMessage: ApiErrorResponse["message"]) => {
    openSnackbar(errorMessage);
  };

  const apiErrorHandler = (error: AxiosError<ApiErrorResponse>): void => {
    const { status, data: customErrorInfo } = error.response!;

    switch (status) {
      case 401: // Unauthorized
        unauthorizedErrorHandler();
        break;
      case 403: // Forbidden
        forbiddenErrorHandler(error);
        break;
      default:
        defaultErrorHandler(customErrorInfo.message);
    }

    return;
  };

  return apiErrorHandler;
};

export default useApiErrorHandler;
