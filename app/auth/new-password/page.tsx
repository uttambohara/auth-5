"use client";

import newPassword from "@/actions/new-password";
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
import { NewPasswordSchema, newPasswordSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

export default function NewPassword() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const form = useForm<NewPasswordSchema>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  if (!token) return null;
  function onSubmit(values: NewPasswordSchema) {
    setError("");
    setSuccess("");
    startTransition(() =>
      newPassword(values, token).then((res) => {
        setError(res?.error as string);
        setSuccess(res?.success as string);
      })
    );

    form.reset();
  }

  return (
    <CardWrapper
      heading={"New password"}
      description={"You can change your password.."}
      hasSocialIcons={false}
      backHref={"/auth/login"}
      backMessage={"Back to login"}
    >
      <div className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="******"
                      type="password"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending}>
              Reset password
            </Button>
          </form>
        </Form>

        {error && <CardMessage type={"error"} label={error} />}
        {success && <CardMessage type={"success"} label={success} />}
      </div>
    </CardWrapper>
  );
}
