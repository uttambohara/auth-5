"use client";

import AuthWrapper from "@/components/auth/auth-wrapper";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useEffect, useState, useTransition } from "react";
import { NewPasswordSchema, newPasswordSchema } from "@/schema";
import Message from "@/components/auth/message";
import resetPasswordToken from "@/actions/verifyPasswordResetToken";
import { useSearchParams } from "next/navigation";
import { HashLoader } from "react-spinners";

export default function NewPassword() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  // Form
  const form = useForm<NewPasswordSchema>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  function onSubmit(values: NewPasswordSchema) {
    setError("");
    setSuccess("");
    startTransition(() =>
      resetPasswordToken(token as string, values.password).then((res) => {
        setError(res.error as string);
        setSuccess(res.success as string);
      })
    );
  }

  return (
    <AuthWrapper
      headerLabel={"🔐 Auth"}
      headerDescription={"Enter a password"}
      hasSocialLink={false}
      backLinkHref={"/auth/login"}
      backLinkLabel={"Back to login"}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reset password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="*******"
                    type="password"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && <Message label={error} type="error" />}
          {success && <Message label={success} type="success" />}

          <Button type="submit" className="w-full" disabled={isPending}>
            Reset password
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
}
