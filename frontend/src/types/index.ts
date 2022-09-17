import { RECIPIENT } from "@/constants";

export interface Team {
  id: number;
  name: string;
  description: string;
  emoji: string;
  color: string;
  nickname: string;
  joined: boolean;
  secret: boolean;
}

export interface Message {
  id: number;
  content: string;
  from: string;
  color: string;
  anonymous: boolean;
  secret: boolean;
  editable: boolean;
  visible: boolean;
}

export interface Rollingpaper {
  id: number;
  title: string;
  to: string;
  recipient: Recipient;
  messages: Message[];
}

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface TeamMember {
  id: number;
  nickname: string;
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

export interface ResponseReceivedRollingpapers {
  totalCount: number;
  currentPage: number;
  rollingpapers: ReceivedRollingpaper[];
}

export interface ResponseSentMessages {
  totalCount: number;
  currentPage: number;
  messages: SentMessage[];
}

export type CustomError = {
  errorCode: number;
  message: string;
};

export type ValueOf<T> = T[keyof T];

export type Recipient = ValueOf<typeof RECIPIENT>;

export type ApiOptions = {
  onError?: () => void;
};

export type ApiErrorResponse = {
  errorCode: number;
  message: string;
};
