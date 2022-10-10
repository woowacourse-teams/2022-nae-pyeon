import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

import { useSnackbar } from "@/context/SnackbarContext";

import { ApiErrorResponse } from "@/types/api";

interface CustomError {
  message: string;
  errorCode: number;
  requestUrl: string;
}

const useApiErrorHandler = () => {
  const { openSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const badRequestErrorHandler = (customErrorInfo: CustomError) => {
    const { message, errorCode, requestUrl } = customErrorInfo;
    const requestUrlPaths = requestUrl.split("/");
    const teamIdIndex = requestUrlPaths.indexOf("teams") + 1;

    switch (errorCode) {
      // OAuth authorizationCode 또는 redirectUri가 잘못된 경우, 혹은 카카오의 Authorization Server가 정상작동하지 않는 경우
      case 3014:
        navigate("/login");
        openSnackbar(message);
        break;
      // 이미 가입한 멤버가 모임에 재가입 시도
      case 4007:
      case 4008:
        navigate(`/team/${teamIdIndex}`);
        openSnackbar(message);
        break;
      // 초대코드 관련
      case 4015:
      case 4016:
      case 4017:
        navigate(`/team/${teamIdIndex}`);
        openSnackbar(message);
        break;
      default:
        openSnackbar(message);
    }
  };

  const unauthorizedErrorHandler = (customErrorInfo: CustomError) => {
    const { message, errorCode } = customErrorInfo;

    switch (errorCode) {
      // 토큰 관련
      case 3011:
      case 3012:
      case 3013:
        navigate("/logout");
        openSnackbar(message);
        break;
      // OAuth 로그인 실패
      case 3015:
      case 3016:
      case 3017:
        navigate("/login");
        openSnackbar(message);
        break;
      default:
        openSnackbar(message);
    }
  };

  const forbiddenErrorHandler = (customErrorInfo: CustomError) => {
    const { message } = customErrorInfo;

    navigate(`/`);
    openSnackbar(message);
  };

  const apiErrorHandler = (error: AxiosError<ApiErrorResponse>): void => {
    const { status, data } = error.response!;
    const requestUrl = error.config.url!;

    const customErrorInfo = {
      ...data!,
      errorCode: Number(data!.errorCode),
      requestUrl,
    };

    switch (status) {
      case 400: // Bad Request
        badRequestErrorHandler(customErrorInfo);
        break;
      case 401: // Unauthorized
        unauthorizedErrorHandler(customErrorInfo);
        break;
      case 403: // Forbidden
        forbiddenErrorHandler(customErrorInfo);
        break;
      case 404: // Not Found
      default:
        openSnackbar(customErrorInfo.message);
    }

    return;
  };

  return apiErrorHandler;
};

export default useApiErrorHandler;
