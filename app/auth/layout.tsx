import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen grid place-content-center">
      <main className="w-[25rem]">{children}</main>
    </div>
  );
}
