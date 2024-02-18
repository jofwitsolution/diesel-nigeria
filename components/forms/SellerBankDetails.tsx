"use client";

import { useState, useTransition } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { User } from "@prisma/client";
import { BankDetailsSchema } from "@/lib/validations";
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
import { FormError } from "./FormError";
import { sellerUpdateBankDetails } from "@/lib/actions/seller.action";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import Notice from "../shared/Notice";

interface Props {
  user: User;
}

const SellerBankDetails = ({ user }: Props) => {
  const pathname = usePathname();
  const [error, setError] = useState<string | undefined>("");
  const [isModify, setIsModify] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof BankDetailsSchema>>({
    resolver: zodResolver(BankDetailsSchema),
    defaultValues: {
      accountNumber: user?.accountNumber!,
      bank: user?.bank!,
      accountName: user?.accountName!,
    },
  });

  const onSubmit = async (values: z.infer<typeof BankDetailsSchema>) => {
    setError("");

    startTransition(() => {
      sellerUpdateBankDetails(values, pathname).then((data) => {
        setError(data.error);

        if (data.success) {
          toast.success("Changes saved successfuly");
          setIsModify(false);
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
            <h2 className="mb-8 font-[700] md:text-[1.125rem]">Bank details</h2>

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
                      disabled={isPending || !isModify}
                      placeholder="Enter account number"
                      type="number"
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
                      disabled={isPending || !isModify}
                      placeholder="Enter bank"
                      type="text"
                      className="w-full rounded-[4px] border-[#9EA2B3] py-[0.75rem]"
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
                      disabled={isPending || !isModify}
                      placeholder="Enter account name"
                      type="text"
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
                type="button"
                onClick={() => setIsModify(true)}
                className={`${!isModify ? "visible" : "invisible"} h-[1.35rem] w-[3.3rem] rounded-sm bg-slate-200 text-[0.75rem] text-gray-500 hover:text-white`}
              >
                Modify
              </Button>

              <Button
                disabled={isPending}
                type="submit"
                className={`${isModify ? "visible" : "invisible"} primary-btn-medium mx-auto`}
              >
                {isPending ? "Saving..." : "Save changes"}
              </Button>
            </div>
          </div>
          <div className="xs:w-[18.75rem] sm:w-[20rem]">
            <div className="max-w-[16rem]">
              <Notice content="Account name must be the same as business name" />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SellerBankDetails;
