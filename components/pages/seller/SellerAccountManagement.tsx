"use client";

import React, { useState, useTransition } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import DialogWrapper from "@/components/shared/dialog/DialogWrapper";
import { FormSuccess } from "@/components/forms/FormSuccess";
import { FormError } from "@/components/forms/FormError";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { WithdrawalSchema } from "@/lib/validations";
import { sellerWithdrawFunds } from "@/lib/actions/seller.action";
import LoaderOverlay from "@/components/LoaderOverlay";
import { usePathname } from "next/navigation";

interface Props {
  balance: number;
  totalPayment: number;
  totalWithdrawal: number;
  accountNumber: string;
  bank: string;
}

const SellerAccountManagement = ({
  balance,
  totalPayment,
  totalWithdrawal,
  accountNumber,
  bank,
}: Props) => {
  const pathname = usePathname();

  const [isWithdrawDialogOpen, setWithdrawDialogOpen] = useState(false);
  const [isSuccessDialogOpen, setSuccessDialogOpen] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [formValues, setFormValues] = useState({});

  const form = useForm<z.infer<typeof WithdrawalSchema>>({
    resolver: zodResolver(WithdrawalSchema),
    defaultValues: {
      amount: "",
      description: "",
      accountNumber,
      bank,
    },
  });

  const onSubmit = async (values: z.infer<typeof WithdrawalSchema>) => {
    setError("");
    setSuccess("");
    setFormValues(values);

    startTransition(() => {
      sellerWithdrawFunds(values, pathname).then((data) => {
        setError(data.error);
        setSuccess(data.success);

        if (data?.success) {
          form.reset();
          setWithdrawDialogOpen(false);
          setSuccessDialogOpen(true);
          toast.success(data.success);
        }
      });
    });
  };

  return (
    <>
      <div className="mt-6 w-full space-y-6 rounded-lg bg-light-900 p-3">
        <div className="flex flex-wrap justify-between gap-6">
          <div className="flex flex-col gap-1">
            <span className="font-medium md:text-[1.125rem]">
              Account Management
            </span>
            <span className="text-[0.75rem] font-medium text-[#8798AD]">
              Here’s an overview of your payments
            </span>
          </div>
          <div>
            <Button
              onClick={() => {
                setWithdrawDialogOpen(true);
                setError("");
                setSuccess("");
              }}
              className="h-[2.375rem] border border-primary-500 px-6 font-[700] text-primary-500 active:bg-primary-100"
            >
              Withdraw Funds
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="max-xs:[35%] flex h-[5.25rem] flex-[29%] flex-col gap-1 rounded-md border bg-primary-500 px-2 py-3 text-light-900 md:flex-[39%] md:px-4">
            <span className="text-nowrap text-[0.75rem] font-medium">
              Wallet Balance
            </span>
            <span className="text-[1.5rem] font-medium leading-[1.6rem] lg:text-[2.5rem] lg:leading-[2.6rem]">
              {formatPrice(balance)}
            </span>
          </div>
          <div className="flex h-[5.25rem] flex-[28%] flex-col gap-2 rounded-md border px-2 py-3 max-xs:flex-[50%] md:flex-[23%] md:px-4">
            <span className="flex shrink-0 justify-between gap-4 text-nowrap">
              <span className="text-[0.875rem] font-semibold">
                Total Payment
              </span>
              <Image
                src="/images/icons/naira-in.svg"
                width={20}
                height={20}
                alt="naira in"
              />
            </span>
            <span className="font-medium lg:text-[1.25rem]">
              {formatPrice(totalPayment)}
            </span>
          </div>
          <div className="flex h-[5.25rem] flex-[28%] flex-col gap-2 rounded-md border px-2 py-3 md:flex-[23%] md:px-4">
            <span className="flex shrink-0 justify-between gap-4 text-nowrap">
              <span className="text-[0.875rem] font-semibold">
                Total Withdrawal
              </span>
              <Image
                src="/images/icons/naira-out.svg"
                width={20}
                height={20}
                alt="naira in"
              />
            </span>
            <span className="font-medium lg:text-[1.25rem]">
              {formatPrice(totalWithdrawal)}
            </span>
          </div>
        </div>
      </div>
      <DialogWrapper
        dialogState={isWithdrawDialogOpen}
        handleDialogState={() => {
          setWithdrawDialogOpen(!isWithdrawDialogOpen);
        }}
        title="Withdraw Funds"
        containerStyle="max-w-[24.75rem]"
      >
        <div className="mx-auto w-full xs:w-[20.75rem]">
          <div className="mb-4 flex w-full flex-col bg-primary-500 px-2 py-3 text-light-900 md:px-4">
            <span className="text-[0.75rem]">Wallet Balance</span>
            <span>
              <span className="font-fraunces text-[1.1rem] md:text-[1.5rem]">
                {formatPrice(balance)}
              </span>
            </span>
          </div>
          <div className="w-full">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-4"
              >
                <div className="w-full space-y-3">
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[0.875rem] text-[#151515]">
                          Amount (Naira)
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="Enter amount"
                            type="number"
                            className="w-full rounded-[4px] border-[#9EA2B3]"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 max-xs:text-[0.7rem]" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[0.875rem] text-[#151515]">
                          Description
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="Enter description"
                            type="text"
                            className="w-full rounded-[4px] border-[#9EA2B3]"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 max-xs:text-[0.7rem]" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="accountNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[0.875rem] text-[#151515]">
                          Account Number
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={true}
                            placeholder="Enter account number"
                            type="number"
                            className="w-full rounded-[4px] border-[#9EA2B3]"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 max-xs:text-[0.7rem]" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bank"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[0.875rem] text-[#151515]">
                          Bank
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={true}
                            placeholder="Enter bank name"
                            type="text"
                            className="w-full rounded-[4px] border-[#9EA2B3]"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 max-xs:text-[0.7rem]" />
                      </FormItem>
                    )}
                  />
                </div>
                <FormError message={error} />
                <FormSuccess message={success} />
                <div className="">
                  <Button
                    disabled={isPending}
                    type="submit"
                    className="h-[2.3rem] w-full rounded-[4px] bg-primary-500 px-4 font-fraunces text-light-900 active:bg-primary-100"
                  >
                    Withdraw
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </DialogWrapper>
      {isPending && (
        <LoaderOverlay type="cliploader" size={40} text="Please wait..." />
      )}
      <DialogWrapper
        dialogState={isSuccessDialogOpen}
        handleDialogState={() => {
          setSuccessDialogOpen(!isSuccessDialogOpen);
        }}
        title=""
        customClose={true}
        containerStyle="max-w-[24.75rem]"
      >
        <div className="flex w-full flex-col items-center justify-center gap-8 px-[1rem] xs:px-[3rem]">
          <Image
            src="/images/confirmed.png"
            width={260}
            height={260}
            alt="success"
          />
          <div className="flex flex-col items-center">
            <span className="gap-1 text-center font-fraunces text-[1.125rem] font-medium">
              Withdrawal Request
            </span>
            <p className="text-center">
              The sum of{" "}
              <span className="font-medium">
                {formatPrice(Number(formValues?.amount))}
              </span>{" "}
              was requested successfully.
            </p>
          </div>
        </div>
      </DialogWrapper>
    </>
  );
};

export default SellerAccountManagement;
