import { AlertTriangle, CheckCircle } from "lucide-react";

interface CardMessageProps {
  type: "success" | "error";
  label: string;
}

export default function CardMessage({
  label,
  type = "error",
}: CardMessageProps) {
  if (type === "error")
    return (
      <div className="bg-red-100 text-red-500 flex items-center gap-2 border border-red-50 p-2 text-sm">
        <AlertTriangle />
        <span>{label}</span>
      </div>
    );

  if (type === "success") {
    return (
      <div className="bg-emerald-100 text-emerald-500 flex items-center gap-2 border-emerald-500 p-2 text-sm">
        <CheckCircle />
        <span>{label}</span>
      </div>
    );
  }
}
