"use client";

import { forgotPassword } from "@/actions/forgot-password";
import CardMessage from "@/components/auth/card-message";
import CardWrapper from "@/components/auth/card-wrapper";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

export default function ForgotPassword() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();

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
      forgotPassword(values).then((res) => {
        setError(res.error as string);
        setSuccess(res.success as string);
      })
    );
  }

  return (
    <CardWrapper
      heading={"Forget password"}
      description={"Forgot your password?"}
      hasSocialIcons={false}
      backHref={"/auth/login"}
      backMessage={"Back to login"}
    >
      <div className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="test@gmail.com"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending}>
              Send reset email
            </Button>
          </form>
        </Form>

        {error && <CardMessage type={"error"} label={error} />}
        {success && <CardMessage type={"success"} label={success} />}
      </div>
    </CardWrapper>
  );
}
