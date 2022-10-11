export type ApiOptions = {
  onError?: () => void;
};

export interface ApiErrorResponse {
  errorCode: string;
  message: string;
}
