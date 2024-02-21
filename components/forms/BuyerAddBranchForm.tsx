"use client";

import { useState, useTransition } from "react";
import { usePathname } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BranchSchema } from "@/lib/validations";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "../ui/dialog";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "./FormError";
import { FormSuccess } from "./FormSuccess";
import LoaderOverlay from "../LoaderOverlay";
import { addBranch } from "@/lib/actions/user.action";

interface Props {
  dialogState: boolean;
  handleDialogState: () => void;
}

const BuyerAddBranchForm = ({ dialogState, handleDialogState }: Props) => {
  const pathname = usePathname();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof BranchSchema>>({
    resolver: zodResolver(BranchSchema),
    defaultValues: {
      state: "",
      address: "",
      email: "",
      phoneNumber: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof BranchSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      addBranch(values, pathname).then((data) => {
        setError(data.error);
        setSuccess(data.success);

        if (data.success) {
          form.reset();
          handleDialogState();
          toast.success("New Branch", {
            description: "Branch added successfuly.",
          });
        }
      });
    });
  };

  return (
    <>
      <Dialog open={dialogState}>
        <DialogOverlay className="z-[1300]">
          <DialogContent className="DialogContent z-[1500] max-w-[29.375rem] rounded-md bg-white py-8">
            <DialogHeader className="border-b pb-2">
              <DialogTitle>Add New Branch</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mx-auto w-[90%] space-y-5 xs:w-[25rem]"
              >
                <div className="w-full space-y-3">
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[0.875rem] text-[#151515]">
                          State
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="Enter state"
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
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[0.875rem] text-[#151515]">
                          Branch Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="Enter address"
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
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[0.875rem] text-[#151515]">
                          Branch email
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="Enter email address"
                            type="email"
                            className="w-full rounded-[4px] border-[#9EA2B3]"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 max-xs:text-[0.7rem]" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[0.875rem] text-[#151515]">
                          Phone Number
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="Enter phone number"
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
                <FormSuccess message={success} />
                <div className="flex w-full justify-end">
                  <div className="space-x-2">
                    <Button
                      disabled={isPending}
                      onClick={() => {
                        handleDialogState();
                        setError("");
                        setSuccess("");
                      }}
                      type="button"
                      className="h-[2rem] rounded-[4px] border border-primary-500 px-4 font-fraunces"
                    >
                      Cancel
                    </Button>
                    <Button
                      disabled={isPending}
                      type="submit"
                      className="h-[2rem] rounded-[4px] bg-primary-500 px-4 font-fraunces text-light-900"
                    >
                      Add Branch
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </DialogContent>
        </DialogOverlay>
      </Dialog>
      {isPending && <LoaderOverlay type="cliploader" size={40} />}
    </>
  );
};

export default BuyerAddBranchForm;
