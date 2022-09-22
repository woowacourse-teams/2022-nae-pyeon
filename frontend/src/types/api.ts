export type ApiOptions = {
  onError?: () => void;
};

export interface ApiErrorResponse {
  errorCode: number;
  message: string;
}
