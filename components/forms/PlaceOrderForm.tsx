"use client";

import React, { useState, useTransition } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PlaceOrderSchema } from "@/lib/validations";
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
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { cn, formatPrice } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import DateInput from "../ui/date-input";
import LoaderOverlay from "../LoaderOverlay";
import { createOrder } from "@/lib/actions/buyer.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props {
  buyerData: {
    businessName: string;
    phoneNumber: string;
    email: string;
    branches: {
      id: string;
      state: string;
      address: string;
    }[];
  };
  sellerData: {
    businessName: string;
    id: string;
    products: {
      density: string;
      price: string;
      numberInStock: string;
      id: string;
      isAvailable: string;
    }[];
  };
}

const PlaceOrderForm = ({ buyerData, sellerData }: Props) => {
  const router = useRouter();

  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof PlaceOrderSchema>>({
    resolver: zodResolver(PlaceOrderSchema),
    defaultValues: {
      businessName: buyerData.businessName,
      email: buyerData.email,
      phoneNumber: buyerData.phoneNumber,
      deliveryLocation: "",
      branch: "",
      product: "",
      quantity: "",
      deliveryDate: new Date(),
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof PlaceOrderSchema>) => {
    setError("");

    if (!isValidQuantity(values.product, values.quantity)) {
      setError("Quantity cannot exceed the available litres");
    }

    startTransition(() => {
      createOrder(sellerData.id, values).then((data) => {
        setError(data.error);

        if (data.success) {
          toast.success("Order created successfuly");
          router.push(`/buyer/sellers/order/${data.orderId}`);
        }
      });
    });
  };

  const isValidQuantity = (productId: string, quantity: string) => {
    const product = sellerData.products.find(
      (product) => product.id === productId
    );

    return Number(product?.numberInStock) > Number(quantity);
  };

  return (
    <>
      <div className="w-full rounded-sm bg-light-900 px-2 py-6 md:px-12 md:py-10">
        <div className="mb-6">
          <span className="font-[600] lg:text-[1.125rem]">
            Fill in your informations to continue with your Order
          </span>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-3"
          >
            <div className="w-full">
              <FormField
                control={form.control}
                name="businessName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[0.875rem] text-[#151515]">
                      Company Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Enter company name"
                        type="name"
                        className="w-full rounded-[4px] border-[#9EA2B3] py-[0.75rem]"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 max-xs:text-[0.7rem]" />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex w-full flex-col gap-3 md:flex-row md:gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="md:flex-1">
                    <FormLabel className="text-[0.875rem] text-[#151515]">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Enter email"
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
                  <FormItem className="md:flex-1">
                    <FormLabel className="text-[0.875rem] text-[#151515]">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Enter phone number"
                        type="phoneNumber"
                        className="w-full rounded-[4px] border-[#9EA2B3] py-[0.75rem]"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 max-xs:text-[0.7rem]" />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="deliveryLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[0.875rem] text-[#151515]">
                      Delivery Location
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Enter delivery location"
                        type="text"
                        className="w-full rounded-[4px] border-[#9EA2B3] py-[0.75rem]"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 max-xs:text-[0.7rem]" />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="branch"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[0.875rem] text-[#151515]">
                      Branch
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full rounded-[4px] border-[#9EA2B3] py-[0.75rem]">
                          <SelectValue placeholder="Select a branch" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-light-900">
                        {buyerData.branches.map((branch) => (
                          <SelectItem
                            className="cursor-pointer hover:bg-gray-400"
                            key={branch.id}
                            value={branch.id}
                          >
                            {branch.address} | {branch.state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400 max-xs:text-[0.7rem]" />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="product"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[0.875rem] text-[#151515]">
                      Diesel Density
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full rounded-[4px] border-[#9EA2B3] py-[0.75rem]">
                          <SelectValue placeholder="Select diesel density" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-light-900">
                        {sellerData.products.map((product) => {
                          if (
                            product.isAvailable &&
                            Number(product.numberInStock) > 0
                          ) {
                            return (
                              <SelectItem
                                className="cursor-pointer hover:bg-gray-400"
                                key={product.id}
                                value={product.id}
                              >
                                (Density {product.density}g/ml) |{" "}
                                {formatPrice(Number(product.price))}/Litre |{" "}
                                <span className="font-medium">
                                  {product.numberInStock}Litres
                                </span>{" "}
                                available
                              </SelectItem>
                            );
                          } else return null;
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400 max-xs:text-[0.7rem]" />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[0.875rem] text-[#151515]">
                      Quantity (Litres)
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Enter quantity"
                        type="number"
                        className="w-full rounded-[4px] border-[#9EA2B3] py-[0.75rem]"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 max-xs:text-[0.7rem]" />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="deliveryDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-[0.875rem] text-[#151515]">
                      Delivery Date
                    </FormLabel>
                    <DateInput field={field} />
                    <FormMessage className="text-red-400 max-xs:text-[0.7rem]" />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[0.875rem] text-[#151515]">
                      Message
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        disabled={isPending}
                        placeholder="Leave a message for seller"
                        className="w-full rounded-[4px] border-[#9EA2B3] py-[0.75rem]"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 max-xs:text-[0.7rem]" />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-3 flex w-full justify-center">
              {" "}
              <FormError message={error} />
            </div>
            <div className="flex w-full justify-end">
              <Button
                disabled={isPending}
                type="submit"
                className="primary-btn-medium"
              >
                Proceed
              </Button>
            </div>
          </form>
        </Form>
      </div>
      {isPending && <LoaderOverlay size={50} text="Creating your order" />}
    </>
  );
};

export default PlaceOrderForm;
