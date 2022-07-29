export interface Message {
  id: number;
  content: string;
  from: string;
  authorId: number;
}

export interface Rollingpaper {
  id: number;
  title: string;
  to: string;
  messages: Message[];
}

export type CustomError = {
  errorCode: number;
  message: string;
};

export type ValueOf<T> = T[keyof T];
