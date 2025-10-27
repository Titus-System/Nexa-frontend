import type Classification from "./classification";

export interface UploadSuccess {
  message: string;
  partnumbers: string[];
  total_partnumbers: number;
  task_id?: string;
  room_id?: string;
  classifications?: {[partnumber: string]: Classification[]};
}

export interface UploadError {
  message?: string;
  error?: string;
}

export type UploadResponse = UploadSuccess | UploadError;

