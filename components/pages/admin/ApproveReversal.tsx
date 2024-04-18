"use client";

import React, { useState, useTransition } from "react";
import { usePathname } from "next/navigation";
import { Reversal } from "@prisma/client";
import { Button } from "@/components/ui/button";
import LoaderOverlay from "@/components/LoaderOverlay";
import DialogWrapper from "@/components/shared/dialog/DialogWrapper";
import { toast } from "sonner";
import { approveReversal } from "@/lib/actions/reversal.action";

interface Props {
  reversal: Reversal;
}

const ApproveReversal = ({ reversal }: Props) => {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isRejectDialog, setRejectDialog] = useState(false);

  const handleRejectReversal = () => {
    startTransition(() => {
      approveReversal(reversal.id, pathname).then((data) => {
        if (data?.error) {
          toast.error(data?.error);
        } else {
          setRejectDialog(false);
          toast.success("Reversal confirmed");
        }
      });
    });
  };
  return (
    <>
      {reversal.status === "pending" ? (
        <Button
          onClick={() => setRejectDialog(true)}
          className="border border-primary-500 hover:bg-red-100"
        >
          Approve Request
        </Button>
      ) : null}

      <DialogWrapper
        title="Transfer Fund"
        handleDialogState={() => setRejectDialog(!isRejectDialog)}
        dialogState={isRejectDialog}
        containerStyle="max-sm:w-[18.75rem] sm:max-w-[24.375rem]"
      >
        <div className="space-y-6">
          <div>
            <p>
              Be sure you have transfered the requested amount to the
              buyer&apos;s bank details.
            </p>
            <p className="mt-1">
              Click confirm to record the approval, otherwise close the dialog.
            </p>
          </div>
          <div>
            <Button
              disabled={isPending}
              onClick={handleRejectReversal}
              className="h-[2.2rem] w-full bg-primary-400 px-2 text-light-900 hover:bg-primary-500"
            >
              Confirm
            </Button>
          </div>
        </div>
      </DialogWrapper>
      {isPending && (
        <LoaderOverlay type="cliploader" size={45} text="Please wait..." />
      )}
    </>
  );
};

export default ApproveReversal;
