"use client";

import { useState, useTransition } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { Branch } from "@prisma/client";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { BranchSchema } from "@/lib/validations";
import DialogWrapper from "../dialog/DialogWrapper";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import LoaderOverlay from "@/components/LoaderOverlay";
import { usePathname } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormError } from "@/components/forms/FormError";
import { FormSuccess } from "@/components/forms/FormSuccess";
import { updateBranch } from "@/lib/actions/user.action";

const BranchActionMenu = ({ branch }: { branch: Branch }) => {
  const pathname = usePathname();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof BranchSchema>>({
    resolver: zodResolver(BranchSchema),
    defaultValues: {
      state: branch.state,
      address: branch.address,
      email: branch.email,
      phoneNumber: branch.phoneNumber,
    },
  });

  const onSubmit = async (values: z.infer<typeof BranchSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      updateBranch(values, branch.id, pathname).then((data) => {
        if (data?.error) {
          setError(data?.error);
        } else {
          form.reset();
          setEditDialogOpen(false);
          setSuccess("Update successful!");
          toast.success("Update successful!");
        }
      });
    });
  };

  return (
    <div className="">
      <Menubar className="border-none">
        <MenubarMenu>
          <MenubarTrigger className="">
            <Image
              src="/images/icons/menu-dot.svg"
              width={24}
              height={24}
              alt="menu"
              className="cursor-pointer"
            />
          </MenubarTrigger>
          <MenubarContent className="bg-light-900">
            <MenubarItem
              onClick={() => setEditDialogOpen(true)}
              className="cursor-pointer hover:font-medium hover:text-primary-400"
            >
              Edit
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      <DialogWrapper
        title="Edit Branch"
        dialogState={isEditDialogOpen}
        containerStyle="max-w-[29.375rem]"
        handleDialogState={() => {
          setEditDialogOpen(!isEditDialogOpen);
        }}
      >
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
                    setEditDialogOpen(false);
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
                  Update
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogWrapper>

      {isPending && (
        <LoaderOverlay type="cliploader" size={40} text="Please wait..." />
      )}
    </div>
  );
};

export default BranchActionMenu;
