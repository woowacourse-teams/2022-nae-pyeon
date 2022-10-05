import { useSnackbar } from "@/context/SnackbarContext";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

import { ApiErrorResponse } from "@/types/api";
import { deleteCookie } from "@/util/cookie";
import { COOKIE_KEY } from "@/constants";

const useQueryErrorHandler = () => {
  const { openSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const queryErrorHandler = (error: AxiosError<ApiErrorResponse>): void => {
    if (!error.response) {
      return;
    }

    const { status, data } = error.response;
    const url = window.location.href.split("/");

    switch (status) {
      case 401:
        deleteCookie(COOKIE_KEY.ACCESS_TOKEN);
        openSnackbar("로그인이 필요한 서비스입니다");
        break;
      case 403:
        navigate(`/team/${url[url.length - 3]}`);
        openSnackbar(data.message);
        break;
      default:
        openSnackbar(data.message);
    }

    return;
  };

  return { queryErrorHandler };
};

export default useQueryErrorHandler;
