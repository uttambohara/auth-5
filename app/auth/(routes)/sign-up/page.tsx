"use client";

import { register } from "@/actions/register";
import MessageForm from "@/components/auth-form/form-message";
import FormWrapper from "@/components/auth-form/formWrapper";
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
import { SignupSchemaT, signupSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

export default function SignIn() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  //
  const form = useForm<SignupSchemaT>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  //
  function onSubmit(values: SignupSchemaT) {
    setError("");
    setSuccess("");
    startTransition(() =>
      register(values).then((res) => {
        setError(res.error);
        setSuccess(res.success);
      })
    );

    form.reset();
  }

  //
  return (
    <div>
      <FormWrapper
        cardTitle="🔐 Auth"
        cardDescription="Create an account"
        hasSocialIcons
        backNavigationMessage="Already have an account?"
        backNavigationhref="/auth/sign-in"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Jack ma"
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="jacktest@gmail.com"
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
                      type="password"
                      placeholder="******"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {success && <MessageForm type={"success"} message={success} />}
            {error && <MessageForm type={"error"} message={error} />}

            <Button type="submit" className="w-full" disabled={isPending}>
              Create an account
            </Button>
          </form>
        </Form>
      </FormWrapper>
    </div>
  );
}
