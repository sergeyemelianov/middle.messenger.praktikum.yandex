export interface WsChatResponse {
  chat_id: number;
  time: string;
  type: string;
  user_id: number;
  content: string;
  is_read: boolean;
  file?: {
    id: number;
    user_id: number;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
  };
}
