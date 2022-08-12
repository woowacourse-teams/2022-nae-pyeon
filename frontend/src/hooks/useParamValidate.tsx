import React from "react";
import { useParams } from "react-router-dom";

const useParamValidate = (requireParams: string[]) => {
  const params = useParams();
  const result: { [key: string]: string } = {};

  for (const requireParam of requireParams) {
    const param = params[requireParam];
    if (!param) {
      throw new Error("올바르지 않은 파라미터 값");
    }
    result[requireParam] = param;
  }

  return result;
};

export default useParamValidate;
