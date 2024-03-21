"use client";

import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
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
import { PasswordInput } from "../ui/password-input";
import { FormSuccess } from "./FormSuccess";
import { FormError } from "./FormError";
import { login } from "@/lib/actions/auth.action";
import Social from "./Social";
import AuthDialog from "../auth/AuthDialog";
import Link from "next/link";

const SignInForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : "";

  const [dialogState, setDialogState] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }

          if (data?.success) {
            setDialogState(true);
            form.reset();
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };

  return (
    <>
      <AuthFormWrapper
        headerText="Sign In"
        backButton={false}
        footerText="Don't have an account?"
        footerHrefLabel="Sign Up"
        footerHref="/auth/register"
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-[18.75rem] space-y-5 xs:w-[25rem]"
          >
            <div className="w-full space-y-3">
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
                        disabled={isPending}
                        placeholder="Enter email address"
                        type="email"
                        className="w-full rounded-[4px] border-[#9EA2B3] py-[0.75rem]"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 max-xs:text-[0.7rem]" />
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
                      <PasswordInput
                        {...field}
                        disabled={isPending}
                        placeholder="Enter password"
                        className="w-full rounded-[4px] border-[#9EA2B3] py-[0.75rem]"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 max-xs:text-[0.7rem]" />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Link
                  href="/auth/forgot-password"
                  className="text-[0.875rem] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            <FormError message={error || urlError} />
            <FormSuccess message={success} />
            <Button
              disabled={isPending}
              type="submit"
              className="h-[3rem] w-full rounded-[4px] bg-primary-500 font-fraunces text-light-900"
            >
              Sign In
            </Button>
          </form>
          <div className="mt-[3.5rem] w-[18.75rem] xs:w-[25rem]">
            <Social callbackUrl={callbackUrl} />
          </div>
        </Form>
      </AuthFormWrapper>
      <AuthDialog
        open={dialogState}
        handleOpen={() => {
          setDialogState(!dialogState);
        }}
        title="Verify Your Email"
      >
        <p className="text-center leading-[1.5rem] sm:my-6 sm:text-[1.13rem]">
          Your email address is not verified. Verification link has been sent to
          your email address, please verify and log in.
        </p>
      </AuthDialog>
    </>
  );
};

export default SignInForm;
