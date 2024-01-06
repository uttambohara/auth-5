"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ForgetPasswordSchema, forgetPasswordSchema } from "@/schema";
import AuthWrapper from "./auth-wrapper";
import { useState, useTransition } from "react";
import resetPassword from "@/actions/reset-password";
import Message from "./message";

export default function ForgotPasswordForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useForm<ForgetPasswordSchema>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: ForgetPasswordSchema) {
    setError("");
    setSuccess("");
    startTransition(() =>
      resetPassword(values).then((res) => {
        setError(res.error as string);
        setSuccess(res.success as string);
      })
    );
  }

  return (
    <AuthWrapper
      headerLabel={"🔐 Auth"}
      headerDescription={"Forget your password?"}
      hasSocialLink={false}
      backLinkHref={"/auth/login"}
      backLinkLabel={"Back to login"}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="john.doe@example.com"
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
            Send reset email
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
}
