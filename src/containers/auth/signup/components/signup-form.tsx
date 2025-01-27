"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Files
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signUpSchema, SignUpValues } from "@/lib/validation";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react";
import { signUp } from "../actions";
import { PasswordInput } from "@/components/password-input";
import LoadingButton from "@/components/LoadingButton";

const SignUpForm = () => {
  const [error, setError] = useState<string>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  const {
    formState: { isValid },
  } = form;

  async function onSubmit(values: SignUpValues) {
    setError(undefined);
    form.clearErrors();

    startTransition(async () => {
      const { error } = await signUp(values);
      if (error) setError(error);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {error && <p className="text-center text-destructive">{error}</p>}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl className="focus-visible:ring-0 focus-visible:ring-offset-0">
                <Input
                  className="focus-visible:bg-secondary"
                  placeholder="Username"
                  {...field}
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
              <FormControl className="focus-visible:ring-0 focus-visible:ring-offset-0">
                <Input
                  className="focus-visible:bg-secondary"
                  placeholder="demo@bugbook.com"
                  type="email"
                  {...field}
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
              <FormControl className="focus-visible:ring-0 focus-visible:ring-offset-0">
                <PasswordInput
                  className="focus-visible:bg-secondary"
                  placeholder="Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton
          disabled={!isValid}
          loading={isPending}
          type="submit"
          className="w-full"
        >
          Create account
        </LoadingButton>
      </form>
    </Form>
  );
};

export default SignUpForm;
