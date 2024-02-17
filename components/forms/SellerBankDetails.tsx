"use client";

import { useState, useTransition } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { User } from "@prisma/client";
import { SellerBusinessInfoSchema } from "@/lib/validations";
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
import ImageInput from "./ImageInput";
import { sellerUpdateBusinessInfo } from "@/lib/actions/seller.action";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

interface Props {
  user: User;
}

const SellerBankDetails = ({ user }: Props) => {
  const pathname = usePathname();
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [imageData, setImageData] = useState<string | ArrayBuffer | null>("");

  const form = useForm<z.infer<typeof SellerBusinessInfoSchema>>({
    resolver: zodResolver(SellerBusinessInfoSchema),
    defaultValues: {
      businessName: user?.businessName!,
      email: user?.email!,
      phoneNumber: user?.phoneNumber!,
      address: user?.address!,
      businessDescription: user?.businessDescription!,
    },
  });

  const onSubmit = async (values: z.infer<typeof SellerBusinessInfoSchema>) => {
    setError("");

    console.log(values);

    startTransition(() => {
      sellerUpdateBusinessInfo(values, imageData, pathname).then((data) => {
        setError(data.error);

        if (data.success) {
          toast.success("Changes saved successfuly");
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
          <div className="space-y-3 xs:w-[18.75rem] sm:w-[20rem]">
            <h2 className="mb-8 font-[700] md:text-[1.125rem]">
              Business information
            </h2>

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
                      disabled={true}
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[0.875rem] text-[#151515]">
                    Business Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={true}
                      placeholder="Enter business email"
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
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[0.875rem] text-[#151515]">
                    Business Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Enter business address"
                      type="text"
                      className="w-full rounded-[4px] border-[#9EA2B3] py-[0.75rem]"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 max-xs:text-[0.7rem]" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col-reverse gap-3 xs:w-[18.75rem] sm:w-[20rem] md:flex-col md:gap-6">
            <div className="self-end md:mt-[-1rem]">
              <Button
                disabled={isPending}
                type="submit"
                className="h-[2.5rem] rounded-[4px] bg-primary-500 font-fraunces text-light-900"
              >
                {isPending ? "Saving..." : "Save changes"}
              </Button>
            </div>

            <div className="w-full space-y-3">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[0.875rem] text-[#151515]">
                      Business Phone number
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={true}
                        placeholder="Enter business phone number"
                        type="tel"
                        className="w-full rounded-[4px] border-[#9EA2B3] py-[0.75rem]"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 max-xs:text-[0.7rem]" />
                  </FormItem>
                )}
              />
              <FormField
                name="avatar"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[0.875rem] text-[#151515]">
                      Business Logo
                    </FormLabel>
                    <FormControl>
                      <ImageInput
                        handleFileData={(data) => setImageData(data)}
                        isDisabled={isPending}
                        currentLogo={user?.avatar?.url!}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 max-xs:text-[0.7rem]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="businessDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[0.875rem] text-[#151515]">
                      Business Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        disabled={isPending}
                        placeholder="Enter business description"
                        className="w-full rounded-[4px] border-[#9EA2B3] py-[0.75rem]"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 max-xs:text-[0.7rem]" />
                  </FormItem>
                )}
              />
              <FormError message={error} />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SellerBankDetails;
