"use client";

import React, { useState, useTransition } from "react";
import { usePathname } from "next/navigation";
import { Order } from "@prisma/client";
import { Button } from "@/components/ui/button";
import LoaderOverlay from "@/components/LoaderOverlay";
import DialogWrapper from "@/components/shared/dialog/DialogWrapper";
import { cancelOrder } from "@/lib/actions/buyer.action";
import { toast } from "sonner";

interface Props {
  order: Order;
}

const CancelOrder = ({ order }: Props) => {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isCancelDialog, setCancelDialog] = useState(false);

  const handleCancelOrder = () => {
    startTransition(() => {
      cancelOrder(order.id, pathname).then((data) => {
        if (data?.error) {
          toast.error(data?.error);
        } else {
          setCancelDialog(false);
          toast.success("Order cancelled");
        }
      });
    });
  };
  return (
    <>
      {!order.isBuyerPaid && order.status === "pending" ? (
        <Button
          onClick={() => setCancelDialog(true)}
          className="border border-primary-500 hover:bg-red-100"
        >
          Cancel Order
        </Button>
      ) : null}

      <DialogWrapper
        title="Confirm Order Cancelation"
        handleDialogState={() => setCancelDialog(!isCancelDialog)}
        dialogState={isCancelDialog}
        containerStyle="max-sm:w-[18.75rem] sm:max-w-[24.375rem]"
      >
        <div className="space-y-6">
          <div>
            <p>Are you sure you want to cancel your order?</p>
            <p className="mt-1">
              Click confirm to cancel, otherwise close dialog.
            </p>
          </div>
          <div>
            <Button
              disabled={isPending}
              onClick={handleCancelOrder}
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

export default CancelOrder;
