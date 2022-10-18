import React from "react";
import { useParams } from "react-router-dom";

const useValidateParam = <T,>(requireParams: string): T => {
  const param = useParams();

  if (!param) {
    throw new Error("올바르지 않은 파라미터 값");
  }

  return param[requireParams] as unknown as T;
};

export default useValidateParam;
