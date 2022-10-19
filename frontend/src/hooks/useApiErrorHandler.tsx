import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { useSnackbar } from "@/context/SnackbarContext";

import useCreateRenewalToken from "@/hooks/useCreateRenewalToken";

import { appClient, requestApi } from "@/api";

import { getCookie } from "@/util/cookie";
import { COOKIE_KEY } from "@/constants";

import { ValueOf } from "@/types";
import { ApiErrorResponse } from "@/types/api";

const METHOD = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete",
} as const;

type Method = ValueOf<typeof METHOD>;

interface CustomError {
  message: string;
  errorCode: number;
  requestUrl: string;
  requestMethod: Method;
  requestData?: string;
}

interface RetryFuncParams {
  requestMethod: Method;
  requestUrl: string;
  requestData?: string;
}

const retryFunc = async ({
  requestMethod,
  requestUrl,
  requestData,
}: RetryFuncParams) =>
  requestApi(() =>
    appClient[requestMethod](requestUrl, requestData && JSON.parse(requestData))
  );

const useApiErrorHandler = () => {
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbar();
  const { mutate: renewalToken } = useCreateRenewalToken();

  const { mutate: retryMutate } = useMutation<
    null,
    AxiosError,
    RetryFuncParams
  >(({ requestMethod, requestUrl, requestData }) =>
    retryFunc({ requestMethod, requestUrl, requestData })
  );

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
        navigate(`/team/${requestUrlPaths[teamIdIndex]}`);
        openSnackbar(message);
        break;
      // 초대코드 관련
      case 4015:
      case 4016:
      case 4017:
        navigate(`/team/${requestUrlPaths[teamIdIndex]}`);
        openSnackbar(message);
        break;
      default:
        openSnackbar(message);
    }
  };

  const unauthorizedErrorHandler = (customErrorInfo: CustomError) => {
    const { message, errorCode, requestUrl, requestMethod, requestData } =
      customErrorInfo;

    switch (errorCode) {
      // 잘못된 access token, access token 만료
      case 3011:
      case 3012: {
        const refreshToken = getCookie(COOKIE_KEY.REFRESH_TOKEN);
        if (!refreshToken) {
          navigate("/logout");
          openSnackbar(message);
          break;
        }

        renewalToken({
          refreshToken,
          mutateFunc: () =>
            retryMutate({
              requestMethod,
              requestUrl,
              requestData,
            }),
        });
        break;
      }
      // 토큰 관련
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
    const { message, errorCode, requestUrl } = customErrorInfo;
    const requestUrlPaths = requestUrl.split("/");
    const teamIdIndex = requestUrlPaths.indexOf("teams") + 1;

    switch (errorCode) {
      case 4013:
        navigate(`/team/${requestUrlPaths[teamIdIndex]}`);
        openSnackbar(message);
        break;
      default:
        openSnackbar(message);
    }
  };

  const apiErrorHandler = (error: AxiosError<ApiErrorResponse>): void => {
    const { status, data } = error.response!;
    const requestUrl = error.config.url!;
    const requestMethod = error.config.method! as Method;
    const requestData = error.config.data;

    const customErrorInfo = {
      ...data!,
      errorCode: Number(data!.errorCode),
      requestUrl,
      requestMethod,
      requestData,
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
