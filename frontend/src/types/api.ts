export type ApiOptions = {
  onError?: () => void;
};

export interface ApiErrorResponse {
  errorCode: number;
  message: string;
}

export interface QueryOptions {
  onError?: () => void;
  onSuccess?: (data?: any) => void; // 이거 타이핑 어떻게 해야 좋을지 모르겠음
  enabled?: boolean;
  keepPreviousData?: boolean;
}
