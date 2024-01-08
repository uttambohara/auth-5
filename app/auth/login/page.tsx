"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { login } from "@/actions/login";
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
import { LoginSchema, loginSchema } from "@/schema";
import { useState, useTransition } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: LoginSchema) {
    setError("");
    setSuccess("");
    startTransition(() =>
      login(values).then((res) => {
        setError(res.error as string);
        setSuccess(res.success as string);
      })
    );
  }

  return (
    <CardWrapper
      heading={"Login"}
      description={"New to App?"}
      hasSocialIcons
      backHref={"/auth/register"}
      backMessage={"Sign up for an account"}
    >
      {success !== "twoFactorEnabled" && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
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

            <div className="text-sm hover:underline hover:underline-offset-4">
              <Link href={"/auth/forgot-password"}>Forgot password</Link>
            </div>

            {error && <CardMessage type={"error"} label={error} />}
            {success !== "twoFactorEnabled" && success && (
              <CardMessage type={"success"} label={success} />
            )}

            <Button type="submit" className="w-full" disabled={isPending}>
              Login
            </Button>
          </form>
        </Form>
      )}

      {success === "twoFactorEnabled" && (
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Two factor code</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="12345"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isPending}>
                Login
              </Button>
            </form>
          </Form>
        </div>
      )}
    </CardWrapper>
  );
}
