"use client";

import { useState, useTransition } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import AuthFormWrapper from "../auth/AuthFormWrapper";
import { useForm } from "react-hook-form";
import { IndividualSignUpSchema } from "@/lib/validations";
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
import { FormError } from "./FormError";
import { FormSuccess } from "./FormSuccess";
import { checkExistingUser } from "@/lib/actions/auth.action";

interface Props {
  getSignUpData: (data: z.infer<typeof IndividualSignUpSchema>) => void;
  nextStep: () => void;
}

const OrgSignUpForm = ({ getSignUpData, nextStep }: Props) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof IndividualSignUpSchema>>({
    resolver: zodResolver(IndividualSignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof IndividualSignUpSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      checkExistingUser(values.email).then((data) => {
        setError(data.error);

        if (data.success) {
          getSignUpData(values);
          nextStep();
        }
      });
    });
  };

  return (
    <>
      <AuthFormWrapper
        headerText="Sign Up"
        backButton={true}
        backButtonHref="/auth/register"
        footerText="Already have an account?"
        footerHrefLabel="Sign In"
        footerHref="/auth/login"
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-[18.75rem] space-y-5 xs:w-[25rem]"
          >
            <div className="w-full space-y-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[0.875rem] text-[#151515]">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter full name"
                        type="name"
                        disabled={isPending}
                        className="w-full rounded-[4px] border-[#9EA2B3] py-[0.75rem]"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 max-xs:text-[0.7rem]" />
                  </FormItem>
                )}
              />
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
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[0.875rem] text-[#151515]">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <PasswordInput
                        {...field}
                        disabled={isPending}
                        placeholder="Confirm password"
                        className="w-full rounded-[4px] border-[#9EA2B3] py-[0.75rem]"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 max-xs:text-[0.7rem]" />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button
              type="submit"
              disabled={isPending}
              className="h-[3rem] w-full rounded-[4px] bg-primary-500 font-fraunces text-light-900"
            >
              Proceed
            </Button>
          </form>
        </Form>
      </AuthFormWrapper>
    </>
  );
};

export default OrgSignUpForm;
