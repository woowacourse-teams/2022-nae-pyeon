type ErrorHandler = () => void;

type ApiErrorArgs = {
  errorCode: number;
  message: string;
  errorHandler?: ErrorHandler;
};

export default class ApiError extends Error {
  errorCode: number;
  message: string;
  errorHandler: ErrorHandler | undefined;

  constructor({ errorCode, message, errorHandler }: ApiErrorArgs) {
    super(message);
    this.errorCode = errorCode;
    this.message = message;
    this.errorHandler = errorHandler;
  }
}
