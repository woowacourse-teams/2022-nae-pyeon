export interface Message {
  id: number;
  content: string;
  from: string;
  authorId: number;
  color: string;
}

export interface Rollingpaper {
  id: number;
  title: string;
  to: string;
  messages: Message[];
}

export interface UserInfo {
  id: number;
  username: string;
  email: string;
}

export interface ReceivedRollingpaper {
  id: number;
  title: string;
  teamId: number;
  teamName: string;
}

export interface SentMessage {
  id: number;
  rollingpaperId: number;
  rollingpaperTitle: string;
  teamId: number;
  teamName: string;
  to: string;
  content: string;
  color: string;
}

export type CustomError = {
  errorCode: number;
  message: string;
};

export type ValueOf<T> = T[keyof T];
