"use client";

import authVerificationCode from "@/actions/auth-verification-code";
import CardMessage from "@/components/auth/card-message";
import CardWrapper from "@/components/auth/card-wrapper";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";

export default function NewVerification() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(function () {
    if (token) {
      authVerificationCode(token).then((res) => {
        setError(res.error as string);
        setSuccess(res.success as string);
      });
    }
  }, []);

  return (
    <CardWrapper
      heading={"Verfication"}
      description={"Confirm your verification."}
      hasSocialIcons={false}
      backHref={"/auth/login"}
      backMessage={"Go back to login"}
    >
      <div className="space-y-4">
        {!error && !success && (
          <div className="flex items-center justify-center">
            <PuffLoader />
          </div>
        )}

        {error && <CardMessage type={"error"} label={error} />}
        {success && <CardMessage type={"success"} label={success} />}
      </div>
    </CardWrapper>
  );
}
