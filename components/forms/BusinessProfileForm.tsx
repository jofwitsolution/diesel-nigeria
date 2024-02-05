"use client";

import { useState, useTransition } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthFormWrapper from "../auth/AuthFormWrapper";
import { useForm } from "react-hook-form";
import {
  BusinessProfileSchema,
  IndividualSignUpSchema,
} from "@/lib/validations";
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
import { registerOrganization } from "@/lib/actions/auth.action";
import { FormError } from "./FormError";
import { FormSuccess } from "./FormSuccess";
import DialogDemo from "../auth/AuthDialog";
import FileInput from "./FileInput";

interface Props {
  signupData: z.infer<typeof IndividualSignUpSchema> | null;
}

const BusinessProfileForm = ({ signupData }: Props) => {
  const [dialogState, setDialogState] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [fileData, setFileData] = useState<string | ArrayBuffer | null>("");

  const form = useForm<z.infer<typeof BusinessProfileSchema>>({
    resolver: zodResolver(BusinessProfileSchema),
    defaultValues: {
      name: "",
      rcNumber: "",
      address: "",
      phoneNumber: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof BusinessProfileSchema>) => {
    setError("");
    setSuccess("");
    // console.log(values);
    // console.log(fileData);
    // console.log(signupData);

    startTransition(() => {
      registerOrganization(fileData, values, signupData).then((data) => {
        setError(data.error);
        setSuccess(data.success);

        if (data.success) {
          setDialogState(true);
          form.reset();
        }
      });
    });
  };

  return (
    <>
      <AuthFormWrapper
        headerText="Complete Business Profile"
        backButton={false}
        footerText="Already have an account?"
        footerHrefLabel="Sign In"
        footerHref="/auth/login"
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-[18.75rem] space-y-5 xs:w-[25rem]"
          >
            <div className="w-full space-y-3">
              <FormField
                control={form.control}
                name="name"
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
                name="document"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[0.875rem] text-[#151515]">
                      Upload Document
                    </FormLabel>
                    <FormControl>
                      <FileInput
                        handleFileData={(data) => setFileData(data)}
                        isDisabled={isPending}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button
              disabled={isPending}
              type="submit"
              className="h-[3rem] w-full rounded-[4px] bg-primary-500 font-fraunces text-light-900"
            >
              {isPending ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Form>
      </AuthFormWrapper>
      <DialogDemo
        open={dialogState}
        handleOpen={() => setDialogState(!dialogState)}
        title="Registration Successful"
      >
        <p className="text-center leading-[1.5rem] sm:my-6 sm:text-[1.13rem]">
          Thank you for submitting your registration. Your request is currently
          pending approval. To complete the registration process, a verification
          link has been sent to your email. Please verify your email address to
          proceed and log in.
        </p>
      </DialogDemo>
    </>
  );
};

export default BusinessProfileForm;
