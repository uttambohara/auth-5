interface CardMessageProp {
  type: "success" | "error";
  label: string;
}

export default function CardMessage({ type, label }: CardMessageProp) {
  if (type === "error")
    return (
      <div className="p-3 bg-destructive/10 text-destructive/80 text-sm">
        {label}
      </div>
    );

  return (
    <div className="p-3 bg-emerald-100 text-emerald-600 text-sm">{label}</div>
  );
}
