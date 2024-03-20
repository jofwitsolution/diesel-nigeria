"use client";

import React, { useState, useTransition } from "react";
import { usePathname } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Order } from "@prisma/client";
import DialogWrapper from "@/components/shared/dialog/DialogWrapper";
import LoaderOverlay from "@/components/LoaderOverlay";
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
import { RequestReversalSchema } from "@/lib/validations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { reversalReasons } from "@/constants";
import { Textarea } from "@/components/ui/textarea";
import { requestForReversal } from "@/lib/actions/buyer.action";

interface Props {
  order: Order;
}

const RequestReversal = ({ order }: Props) => {
  const pathname = usePathname();
  const [isRequestDialogOpen, setRequestDialog] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof RequestReversalSchema>>({
    resolver: zodResolver(RequestReversalSchema),
    defaultValues: {
      reason: "",
      description: "",
      accountNumber: "",
      bank: "",
      accountName: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof RequestReversalSchema>) => {
    setError("");

    startTransition(() =>
      requestForReversal(values, order.id, pathname).then((data) => {
        if (data?.error) {
          setError(data?.error);
          toast.error(data?.error);
        } else {
          toast.success("Request submitted successfully");
          setRequestDialog(false);
          form.reset();
        }
      })
    );
  };

  return (
    <>
      {order.isBuyerPaid && order.status === "pending" ? (
        <Button
          onClick={() => setRequestDialog(true)}
          className="border border-primary-500 hover:bg-red-100"
        >
          Request Reversal
        </Button>
      ) : null}

      <DialogWrapper
        title="Request Reversal"
        handleDialogState={() => {
          setRequestDialog(!isRequestDialogOpen);
          setError("");
          form.reset();
        }}
        dialogState={isRequestDialogOpen}
        containerStyle="max-sm:w-[18.75rem] sm:max-w-[24.375rem]"
      >
        <div className="custom-scrollbar h-[25rem] space-y-6 overflow-y-auto">
          <div className="bg-[#E1E3E5] px-1  py-2 md:px-2">
            <div className="flex justify-between gap-8 text-[0.75rem]">
              <span>Order Number</span>
              <span className="font-semibold text-[#4B5563]">
                {order.orderNumber}
              </span>
            </div>
          </div>
          <div>
            <span className="font-medium">
              Please provide the following details
            </span>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-4"
            >
              <div className="w-full space-y-3">
                <FormField
                  control={form.control}
                  name="reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[0.875rem] text-[#151515]">
                        Reason
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full rounded-[4px] border-[#9EA2B3] py-[0.75rem]">
                            <SelectValue placeholder="Why are you requesting reversal?" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="z-[9500] bg-light-900">
                          {reversalReasons.map((reason) => (
                            <SelectItem
                              className="cursor-pointer hover:bg-gray-400"
                              key={reason.id}
                              value={reason.value}
                            >
                              {reason.value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                        <Textarea
                          {...field}
                          disabled={isPending}
                          placeholder="Describe your reason here!"
                          className="w-full rounded-[4px] border-[#9EA2B3] py-[0.75rem]"
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
                          disabled={isPending}
                          placeholder="Enter bank name"
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
                  name="accountName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[0.875rem] text-[#151515]">
                        Account Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="Enter account name"
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
                          disabled={isPending}
                          placeholder="Enter account number"
                          type="number"
                          className="w-full rounded-[4px] border-[#9EA2B3]"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400 max-xs:text-[0.7rem]" />
                    </FormItem>
                  )}
                />
              </div>
              <FormError message={error} />
              <div className="">
                <Button
                  disabled={isPending}
                  type="submit"
                  className="h-[2.3rem] w-full rounded-[4px] bg-primary-500 px-4 font-fraunces text-light-900 active:bg-primary-100"
                >
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogWrapper>
      {isPending && (
        <LoaderOverlay type="cliploader" size={45} text="Please wait..." />
      )}
    </>
  );
};

export default RequestReversal;
