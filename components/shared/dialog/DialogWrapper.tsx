import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Props {
  dialogState: boolean;
  handleDialogState: () => void;
  children: React.ReactNode;
  title: string;
  containerStyle: string;
}

const DialogWrapper = ({
  dialogState,
  handleDialogState,
  children,
  title,
  containerStyle,
}: Props) => {
  return (
    <Dialog open={dialogState}>
      <DialogOverlay className="z-[1300]">
        <DialogContent
          className={`${containerStyle} z-[1500] rounded-[0.9rem] bg-white pb-8 pt-4 sm:rounded-xl`}
        >
          <DialogHeader className="border-b pb-2">
            <DialogTitle className="flex w-full justify-between text-[0.88rem] font-medium">
              <span>{title}</span>
              <Button
                onClick={() => {
                  handleDialogState();
                }}
                type="button"
                className="size-max p-0"
              >
                <Image
                  src="/images/icons/cancel.svg"
                  width={14}
                  height={14}
                  alt="cancel"
                />
              </Button>
            </DialogTitle>
          </DialogHeader>
          {children}
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};

export default DialogWrapper;
