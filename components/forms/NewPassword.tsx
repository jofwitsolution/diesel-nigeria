"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { FormError } from "./FormError";
import { FormSuccess } from "./FormSuccess";
import { Button } from "../ui/button";
import { newPassword } from "@/lib/actions/auth.action";
import { NewPasswordSchema } from "@/lib/validations";
import Link from "next/link";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { PasswordInput } from "../ui/password-input";
import DialogWrapper from "../shared/dialog/DialogWrapper";

const NewPassword = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [isSuccessDialog, setSuccessDialog] = useState(false);

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      newPassword(values, token).then((data) => {
        if (data?.error) {
          setError(data?.error);
          toast.error(data.error);
        } else {
          setSuccessDialog(true);
          setSuccess(data?.success);
        }
      });
    });
  };

  return (
    <>
      <div className="max-w-[23rem]">
        <h1 className="mb-8 text-center text-[1.2rem] font-semibold md:text-[1.5rem]">
          Set New Password
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <div className="w-full space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel className="text-[0.875rem] text-[#151515]">
                      New Password
                    </FormLabel>
                    <FormControl className="">
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
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button
              disabled={isPending}
              type="submit"
              className="w-full bg-primary-100"
            >
              {isPending ? "Submitting..." : " Reset Password"}
            </Button>
            <div className="mt-8">
              <Link href="/auth/login" className="underline">
                Back to Log in
              </Link>
            </div>
          </form>
        </Form>
      </div>
      <DialogWrapper
        title=""
        customClose={false}
        handleDialogState={() => {}}
        dialogState={isSuccessDialog}
        containerStyle="max-sm:w-[18.75rem] sm:max-w-[24.375rem]"
      >
        <div className="space-y-6">
          <div className="mb-6">
            <h2 className="text-center text-[1.2rem] font-semibold">
              Congratulations
            </h2>
            <p className="mt-2">Your have successfully reset your password</p>
          </div>
          <Link href="/auth/login">
            <Button className="h-[2.2rem] w-full bg-primary-400 px-2 text-light-900 hover:bg-primary-500">
              Log In
            </Button>
          </Link>
        </div>
      </DialogWrapper>
    </>
  );
};

export default NewPassword;
