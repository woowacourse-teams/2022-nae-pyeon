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
