import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface Props {
  dialogState: boolean;
  handleDialogState: () => void;
  children: React.ReactNode;
}

const DialogWrapper = ({ dialogState, handleDialogState, children }: Props) => {
  return (
    <Dialog open={dialogState} onOpenChange={handleDialogState}>
      <DialogContent className="rounded-[0.9rem] bg-white py-8 max-sm:w-[18.75rem] sm:max-w-[29.375rem] sm:rounded-[1.125rem]">
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default DialogWrapper;
