export interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  summary?: string; // AI-generated summary
}
