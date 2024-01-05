import { AlertCircle, CheckCircle } from "lucide-react";

interface MessageProps {
  type: "success" | "error";
  label?: string;
}

export default function Message({ type, label }: MessageProps) {
  if (!label) return null;

  if (type === "success") {
    return (
      <div className="flex items-center gap-2 text-sm bg-emerald-100 p-2 rounded-sm border border-emerald-700/20 text-emerald-600">
        <CheckCircle size={16} />
        {label}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-sm bg-destructive/10 p-2 rounded-sm border border-destructive/70 text-destructive/60">
      <AlertCircle size={16} />
      {label}
    </div>
  );
}
