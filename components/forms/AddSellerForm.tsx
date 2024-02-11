"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
} from "../ui/dialog";
import { useState, useTransition } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { NewSellerSchema } from "@/lib/validations";
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
import { FormSuccess } from "./FormSuccess";
import { DialogTitle } from "@radix-ui/react-dialog";

interface Props {
  dialogState: boolean;
  handleDialogState: () => void;
}

const AddSellerForm = ({ dialogState, handleDialogState }: Props) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewSellerSchema>>({
    resolver: zodResolver(NewSellerSchema),
    defaultValues: {
      businessName: "",
      rcNumber: "",
      email: "",
      address: "",
      phoneNumber: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof NewSellerSchema>) => {
    setError("");
    setSuccess("");
    console.log(values);
    // console.log(fileData);
    // console.log(signupData);

    // startTransition(() => {
    //   registerOrganization(fileData, values, signupData).then((data) => {
    //     setError(data.error);
    //     setSuccess(data.success);

    //     if (data.success) {
    //       form.reset();
    //     }
    //   });
    // });
  };

  return (
    <Dialog open={dialogState}>
      <DialogOverlay className="z-[1300]">
        <DialogContent className="z-[1500] max-w-[29.375rem] rounded-md bg-white py-8">
          <DialogHeader className="border-b pb-2">
            <DialogTitle>Add New Seller</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mx-auto w-[18.75rem] space-y-5 xs:w-[25rem]"
            >
              <div className="w-full space-y-3">
                <FormField
                  control={form.control}
                  name="businessName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[0.875rem] text-[#151515]">
                        Business Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="Enter business name"
                          type="name"
                          className="w-full rounded-[4px] border-[#9EA2B3] py-[0.75rem]"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400 max-xs:text-[0.7rem]" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="rcNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[0.875rem] text-[#151515]">
                        Rc Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="Enter Rc number"
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[0.875rem] text-[#151515]">
                        Company email
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
                          className="w-full rounded-[4px] border-[#9EA2B3] py-[0.75rem]"
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
                        Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="Enter address"
                          type="text"
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
              <div className="flex w-full justify-end">
                <div className="space-x-2">
                  <Button
                    disabled={isPending}
                    type="submit"
                    className="h-[2rem] rounded-[4px] border border-primary-500 px-4 font-fraunces"
                  >
                    Cancel
                  </Button>
                  <Button
                    disabled={isPending}
                    type="submit"
                    className="h-[2rem] rounded-[4px] bg-primary-500 px-4 font-fraunces text-light-900"
                  >
                    {isPending ? "Submitting..." : "Add Seller"}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};

export default AddSellerForm;
