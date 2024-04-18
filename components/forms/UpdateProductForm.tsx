"use client";

import { useState, useTransition } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ProductSchema } from "@/lib/validations";
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
import { Switch } from "../ui/switch";
import { FormError } from "./FormError";
import { FormSuccess } from "./FormSuccess";
import LoaderOverlay from "../LoaderOverlay";
import { Product } from "@prisma/client";
import { updateProduct } from "@/lib/actions/product.action";

interface Props {
  updateDialogState: boolean;
  handleDialogState: () => void;
  product: Product;
}

const UpdateProductForm = ({
  updateDialogState,
  handleDialogState,
  product,
}: Props) => {
  const pathname = usePathname();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      isAvailable: product?.isAvailable,
      density: product?.density,
      price: product?.price,
      numberInStock: product?.numberInStock,
    },
  });

  const onSubmit = async (values: z.infer<typeof ProductSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      updateProduct(values, product?.id, pathname).then((data) => {
        setError(data.error);
        setSuccess(data.success);
        if (data.success) {
          form.reset();
          handleDialogState();
          toast.success("Product Update", {
            description: "Product updated successfuly.",
          });
        }
      });
    });
  };

  return (
    <>
      <Dialog open={updateDialogState}>
        <DialogOverlay className="z-[1300]">
          <DialogContent className="z-[1500] max-w-[24.75rem] rounded-md bg-white py-8">
            <DialogHeader className="border-b pb-2">
              <DialogTitle className="flex w-full justify-between">
                <span>Update Diesel</span>
                <Button
                  disabled={isPending}
                  onClick={() => {
                    handleDialogState();
                    setError("");
                    setSuccess("");
                  }}
                  type="button"
                  className="size-max p-0"
                >
                  <Image
                    src="/images/icons/cancel.svg"
                    width={20}
                    height={20}
                    alt="cancel"
                  />
                </Button>
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mx-auto w-[90%] space-y-5 xs:w-[20.75rem]"
              >
                <div className="w-full space-y-3">
                  <FormField
                    control={form.control}
                    name="isAvailable"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center gap-2">
                          <FormLabel className="flex items-center gap-2 text-[0.875rem] text-[#151515]">
                            <Image
                              src="/images/icons/nozzle-black.svg"
                              width={27.5}
                              height={30}
                              alt="nozzle"
                            />
                            <span>Diesel Availability</span>
                          </FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              disabled={isPending}
                            />
                          </FormControl>
                        </div>
                        <FormMessage className="text-red-400 max-xs:text-[0.7rem]" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="density"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[0.875rem] text-[#151515]">
                          Velocity (g/ml)
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="Enter Velocity"
                            type="number"
                            datatype="number"
                            className="w-full rounded-[4px] border-[#9EA2B3]"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 max-xs:text-[0.7rem]" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[0.875rem] text-[#151515]">
                          Price (Naira)
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="Enter price"
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
                    name="numberInStock"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[0.875rem] text-[#151515]">
                          Available Litre
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="Enter litre"
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
                <div className="">
                  <Button
                    disabled={isPending}
                    type="submit"
                    className="h-[2rem] w-full rounded-[4px] bg-primary-500 px-4 font-fraunces text-light-900 active:bg-primary-100"
                  >
                    Update
                  </Button>
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

export default UpdateProductForm;
