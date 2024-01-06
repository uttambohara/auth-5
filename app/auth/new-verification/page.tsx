"use client";

import verifyAuthToken from "@/actions/verifyAuthToken";
import AuthWrapper from "@/components/auth/auth-wrapper";
import Message from "@/components/auth/message";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DotLoader } from "react-spinners";

export default function NewVerificaiton() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(function () {
    if (token) {
      verifyAuthToken(token).then((res) => {
        setError(res.error as string);
        setSuccess(res.success as string);
      });
    }
  }, []);

  return (
    <AuthWrapper
      headerLabel={"🔐 Auth"}
      headerDescription={"Confirming your verification"}
      hasSocialLink={false}
      backLinkHref={"/auth/login"}
      backLinkLabel={"Back to login"}
    >
      <div className="flex items-center justify-center">
        {!error && !success && <DotLoader />}

        {error && <Message label={error} type="error" />}
        {success && <Message label={success} type="success" />}
      </div>
    </AuthWrapper>
  );
}
