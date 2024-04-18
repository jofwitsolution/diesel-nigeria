"use client";

import React, { useState, useTransition } from "react";
import { Order } from "@prisma/client";
import { Button } from "@/components/ui/button";
import DialogWrapper from "@/components/shared/dialog/DialogWrapper";
import LoaderOverlay from "@/components/LoaderOverlay";
import { usePathname } from "next/navigation";
import { buyerConfirmOrderDelivery } from "@/lib/actions/order.action";
import { toast } from "sonner";

interface Props {
  order: Order;
}

const ConfirmDelivery = ({ order }: Props) => {
  const pathname = usePathname();
  const [isConfirmDeliveryDialogOpen, setConfirmDeliveryDialogOpen] =
    useState(false);
  const [isPending, startTransition] = useTransition();

  const handleConfirmDelivery = () => {
    startTransition(() => {
      buyerConfirmOrderDelivery(order.id, pathname).then((data) => {
        if (data?.error) {
          toast.error(data?.error);
        } else {
          setConfirmDeliveryDialogOpen(false);
          toast.success("Delivery confirmed");
        }
      });
    });
  };

  return (
    <>
      {!order.isdeliveryConfirmed && order.status === "delivered" ? (
        <Button
          onClick={() => setConfirmDeliveryDialogOpen(true)}
          className="border border-primary-500 hover:bg-red-100"
        >
          Confirm Delivery
        </Button>
      ) : null}

      <DialogWrapper
        title="Delivery Confirmation"
        handleDialogState={() =>
          setConfirmDeliveryDialogOpen(!isConfirmDeliveryDialogOpen)
        }
        dialogState={isConfirmDeliveryDialogOpen}
        containerStyle="max-sm:w-[18.75rem] sm:max-w-[24.375rem]"
      >
        <div className="space-y-6">
          <div>
            <p>Only confirm the delivery if your order has been delivered.</p>
            <p className="mt-1">
              Do not click confirm if you are yet to receive your order.
            </p>
          </div>
          <div>
            <Button
              disabled={isPending}
              onClick={handleConfirmDelivery}
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

export default ConfirmDelivery;
