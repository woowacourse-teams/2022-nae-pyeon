export type ApiOptions = {
  onError?: () => void;
};

export type ApiErrorResponse = {
  errorCode: number;
  message: string;
};
