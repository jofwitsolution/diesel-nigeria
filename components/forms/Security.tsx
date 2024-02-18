"use client";

import { useState, useTransition } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ResetPasswordSchema } from "@/lib/validations";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { FormError } from "./FormError";
import { toast } from "sonner";
import { PasswordInput } from "../ui/password-input";
import { resetPassword } from "@/lib/actions/user.action";

const Security = () => {
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ResetPasswordSchema>) => {
    setError("");
    console.log(values);

    startTransition(() => {
      resetPassword(values).then((data) => {
        setError(data.error);

        if (data.success) {
          toast.success("Password reset successfuly");
          form.reset();
        }
      });
    });
  };

  return (
    <div className="mt-6 w-full md:mt-12">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col justify-between gap-3 px-2 max-xs:px-1 md:flex-row lg:gap-8 lg:px-5 xl:px-10"
        >
          <div className="space-y-3 xs:w-[18.75rem] sm:w-[20rem] md:space-y-5">
            <h2 className="mb-8 font-[700] md:text-[1.125rem]">
              Reset password
            </h2>

            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[0.875rem] text-[#151515]">
                    Current Password
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
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[0.875rem] text-[#151515]">
                    New Password
                  </FormLabel>
                  <FormControl>
                    <PasswordInput
                      {...field}
                      disabled={isPending}
                      placeholder="Enter new password"
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
                      placeholder="Enter confirm password"
                      className="w-full rounded-[4px] border-[#9EA2B3] py-[0.75rem]"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 max-xs:text-[0.7rem]" />
                </FormItem>
              )}
            />
            <FormError message={error} />
            <div className="mt-2 w-full">
              <Button
                disabled={isPending}
                type="submit"
                className={`primary-btn-medium mx-auto`}
              >
                {isPending ? "Resetting..." : "Reset Password"}
              </Button>
            </div>
          </div>
          <div className="xs:w-[18.75rem] sm:w-[20rem]"></div>
        </form>
      </Form>
    </div>
  );
};

export default Security;
