"use client";

import CardMessage from "@/components/auth/card-message";
import CardWrapper from "@/components/auth/card-wrapper";
import { AlertCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("error");

  return (
    <CardWrapper
      heading={"Error"}
      description={"Oops! Something went wrong!"}
      hasSocialIcons={false}
      backHref={"/auth/login"}
      backMessage={"Back to login"}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-center">
          <AlertCircle size={40} color="red" />
        </div>

        {errorMessage && (
          <CardMessage
            type={"error"}
            label={"Email already registered with other providers...."}
          />
        )}
      </div>
    </CardWrapper>
  );
}
