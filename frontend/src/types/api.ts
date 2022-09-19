export type ApiOptions = {
  onError?: () => void;
};

export interface ApiErrorResponse {
  errorCode: number;
  message: string;
}

export interface QueryOptions {
  onError?: () => void;
  onSuccess?: () => void;
  enabled?: boolean;
  keepPreviousData?: boolean;
}
