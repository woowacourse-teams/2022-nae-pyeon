type ErrorHandler = () => void;

export default class ApiError extends Error {
  errorCode: number;
  message: string;
  errorHandler: ErrorHandler | undefined;

  constructor(errorCode: number, message: string, errorHandler?: ErrorHandler) {
    super(message);
    this.errorCode = errorCode;
    this.message = message;
    this.errorHandler = errorHandler;
  }
}
