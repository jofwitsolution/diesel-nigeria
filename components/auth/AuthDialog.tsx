import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import React from "react";

interface DialogProps {
  open: boolean;
  handleOpen: () => void;
  children: React.ReactNode;
  title: string;
}

export default function AuthDialog({
  open,
  handleOpen,
  children,
  title,
}: DialogProps) {
  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogContent className="rounded-[0.9rem] bg-white py-8 max-sm:w-[18.75rem] sm:max-w-[29.375rem] sm:rounded-[1.125rem]">
        <DialogHeader>
          <div className="flex justify-center">
            <Image
              src="/images/icons/green-check.svg"
              width={35}
              height={35}
              alt="green check"
            />
          </div>
          <DialogTitle className="mt-10 text-center font-fraunces text-[1.3rem] sm:text-[1.875rem]">
            {title}
          </DialogTitle>
          <DialogDescription>{children}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex w-full justify-center">
            <Button
              onClick={handleOpen}
              className="flex h-[2.375rem] w-[7.75rem] items-center justify-center rounded-md bg-primary-500 text-white"
            >
              Okay
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
