import { AlertCircle, CheckCircle } from "lucide-react";

type MessageForm = {
  message?: string;
  type: "error" | "success";
};

export default function MessageForm({ message, type }: MessageForm) {
  if (!message) return null;

  if (type === "success") {
    return (
      <div className="text-emerald-600 bg-emerald-100 border border-emerald-400 flex items-center gap-3 p-2 rounded-md text-sm">
        <CheckCircle />
        <div> {message}</div>
      </div>
    );
  }

  return (
    <div className="text-destructive/70 bg-destructive/10 border border-destructive/70 flex items-center gap-3 p-2 rounded-md text-sm">
      <AlertCircle />
      <div> {message}</div>
    </div>
  );
}
