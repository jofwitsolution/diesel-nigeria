"use client";

import { useState, useTransition } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { User } from "@prisma/client";
import { BuyerVerificationDocSchema } from "@/lib/validations";
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
import { buyerUploadVerificationDoc } from "@/lib/actions/buyer.action";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import CertificateInput from "./CertificateInput";

interface Props {
  user: User;
}

const BuyerVerificationDoc = ({ user }: Props) => {
  const pathname = usePathname();
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [doc, setDoc] = useState<string | ArrayBuffer | null>("");

  const form = useForm<z.infer<typeof BuyerVerificationDocSchema>>({
    resolver: zodResolver(BuyerVerificationDocSchema),
    defaultValues: {
      businessRegisteration: user?.isVerifiedBuyer ? "Verified" : "Unverified",
      rcNumber: user?.rcNumber as string,
    },
  });

  const onSubmit = async (
    values: z.infer<typeof BuyerVerificationDocSchema>
  ) => {
    setError("");

    startTransition(() => {
      buyerUploadVerificationDoc(values, doc, pathname).then((data) => {
        setError(data?.error);

        if (data?.success) {
          toast.success("Changes saved successfuly");
        }
      });
    });
  };

  return (
    <div className="mt-10 w-full md:mt-20">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col justify-between gap-3 px-2 max-xs:px-1 md:flex-row lg:gap-8 lg:px-5 xl:px-10"
        >
          <div className="space-y-3 xs:w-[18.75rem] sm:w-[20rem]">
            <h2 className="mb-8 font-[700] md:text-[1.125rem]">
              Business verification documents
            </h2>

            <FormField
              name="doc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[0.875rem] text-[#151515]">
                    Document
                  </FormLabel>
                  <FormControl>
                    <CertificateInput
                      handleFileData={(data) => setDoc(data)}
                      isDisabled={isPending}
                      isVerified={user?.isVerifiedBuyer}
                      currentDoc={user?.document?.url!}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 max-xs:text-[0.7rem]" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col-reverse gap-3 xs:w-[18.75rem] sm:w-[20rem] md:flex-col md:gap-8">
            <div className="self-end md:mt-[-1rem]">
              <Button
                disabled={isPending}
                type="submit"
                className="primary-btn-medium"
              >
                {isPending ? "Saving..." : "Save changes"}
              </Button>
            </div>

            <div className="w-full space-y-3">
              <FormField
                control={form.control}
                name="businessRegisteration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[0.875rem] text-[#151515]">
                      Business Registeration
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={true}
                        placeholder="Registeration"
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
                name="rcNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[0.875rem] text-[#151515]">
                      RC Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Enter RC number"
                        type="number"
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

export default BuyerVerificationDoc;
