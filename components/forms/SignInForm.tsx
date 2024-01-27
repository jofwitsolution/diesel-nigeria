"use client";

import { useState, useTransition } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import AuthFormWrapper from "../auth/AuthFormWrapper";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/lib/validations";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";

const SignInForm = () => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    console.log(values);
  };

  return (
    <AuthFormWrapper
      headerText="Sign In"
      backButton={false}
      footerText="Don't have an account?"
      footerHrefLabel="Sign Up"
      footerHref="/sign-up"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[18.75rem] space-y-5 xs:w-[25rem]"
        >
          <div className="w-full space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[0.875rem] text-[#151515]">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter email address"
                      type="email"
                      className="w-full rounded-[4px] border-[#9EA2B3] py-[0.75rem]"
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
                  <FormLabel className="text-[0.875rem] text-[#151515]">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter password"
                      type="password"
                      className="mb-[-2rem] w-full rounded-[4px] border-[#9EA2B3] py-[0.75rem]"
                    />
                  </FormControl>
                  <Button
                    size="sm"
                    variant="link"
                    asChild
                    className="mt-[-2rem] flex w-full justify-end font-normal"
                  >
                    <Link href="/" className="text-[0.875rem] font-medium">
                      Forgot password?
                    </Link>
                  </Button>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={false}
            type="submit"
            className="h-[3rem] w-full rounded-[4px] bg-primary-500 font-fraunces text-light-900"
          >
            Sign In
          </Button>
        </form>
      </Form>
    </AuthFormWrapper>
  );
};

export default SignInForm;
