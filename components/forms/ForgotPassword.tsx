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
import { Input } from "../ui/input";
import { FormError } from "./FormError";
import { FormSuccess } from "./FormSuccess";
import { Button } from "../ui/button";
import { forgotPassword } from "@/lib/actions/auth.action";
import { forgotPasswordSchema } from "@/lib/validations";
import Link from "next/link";
import { toast } from "sonner";

const ForgotPassword = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof forgotPasswordSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      forgotPassword(values).then((data) => {
        if (data?.error) {
          setError(data?.error);
          toast.error(data.error);
        } else {
          form.reset();
          toast.success("Reset link sent to your email address");
          setSuccess(data?.success);
        }
      });
    });
  };

  return (
    <>
      <div className="max-w-[23rem]">
        <h1 className="mb-8 text-center text-[1.2rem] font-semibold md:text-[1.5rem]">
          Forgot Your Password
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[0.875rem] text-[#151515]">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="john.doe@example.com"
                        type="email"
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
              {isPending ? "sending..." : "Send reset email"}
            </Button>
            <div className="mt-8">
              <Link href="/auth/login" className="underline">
                Back to Log in
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default ForgotPassword;
