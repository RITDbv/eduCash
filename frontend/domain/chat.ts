export interface Message {
  content: string | null;
  role: "system" | "user" | "assistant" | "function";
  timestamp: number;
}