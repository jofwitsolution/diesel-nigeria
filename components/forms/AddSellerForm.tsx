"use client";

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
import { addNewSeller } from "@/lib/actions/admin.action";
import LoaderOverlay from "../LoaderOverlay";

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

    startTransition(() => {
      addNewSeller(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);

        if (data.success) {
          form.reset();
          handleDialogState();
          toast.success("New Seller", {
            description: "Seller added successfuly.",
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
              <DialogTitle>Add Seller</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mx-auto w-[90%] space-y-5 xs:w-[25rem]"
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
                            className="w-full rounded-[4px] border-[#9EA2B3]"
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
                          Company email
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
                      Add Seller
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

export default AddSellerForm;
