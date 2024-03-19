"use client";

import React, { useState, useTransition } from "react";
import { Order } from "@prisma/client";
import Image from "next/image";
import { formatDate, formatPrice, getTimeOfDay } from "@/lib/utils";
import { statusBg } from "@/styles/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import DialogWrapper from "@/components/shared/dialog/DialogWrapper";
import { confirmOrderDelivery } from "@/lib/actions/buyer.action";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import LoaderOverlay from "@/components/LoaderOverlay";

interface Props {
  order: Order;
}

const BuyerOrderDetails = ({ order }: Props) => {
  const pathname = usePathname();
  const [isConfirmDeliveryDialogOpen, setConfirmDeliveryDialogOpen] =
    useState(false);
  const [isPending, startTransition] = useTransition();

  const handleConfirmDelivery = () => {
    startTransition(() => {
      confirmOrderDelivery(order.id, pathname).then((data) => {
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
      <div className="w-full rounded-md bg-light-900 px-2 py-3 md:p-6 lg:px-10">
        <div className="flex items-center gap-2 rounded-md bg-light-900 px-2 py-3 max-xs:hidden">
          <Image
            src={
              order?.seller.avatar
                ? order.seller.avatar.url
                : "/images/icons/db-left-avatar.svg"
            }
            width={40}
            height={30}
            alt={order?.seller.businessName}
            className=""
          />
          {order?.seller.businessName}
        </div>
        <div className="my-6 w-full border" />
        <div className="flex w-full flex-col gap-6">
          <span className="text-center font-[600]">Order Details</span>
          <table className="overflow-hidden">
            <thead>
              <tr className="border-b text-left text-[0.3rem] font-medium sm:text-[0.8125rem]">
                <th className="dist-table-style w-[24.625rem]">Litre</th>
                <th className="dist-table-style w-[24.625rem]">
                  Order Date & Time
                </th>
                <th className="dist-table-style w-[24.625rem]">
                  Expected Delivery Date
                </th>
                <th className="dist-table-style w-[24.625rem]">Amount</th>
                <th className="dist-table-style w-[24.625rem]">Order Number</th>
                <th className="dist-table-style w-[24.625rem]">Status</th>
                <th className="dist-table-style w-[24.625rem]">Channel</th>
              </tr>
            </thead>
            <tbody className="">
              <tr className="border-b bg-light-900 text-[0.3rem] text-black max-xs:font-medium xs:text-gray-50 sm:text-[0.8125rem]">
                <td className="dist-table-style">{order.quantity}Litres</td>
                <td className="dist-table-style">
                  <span className="flex flex-col">
                    <span>{formatDate(order.orderDate)}</span>
                    <span className="text-primary-500">
                      {getTimeOfDay(order.orderDate)}
                    </span>
                  </span>
                </td>
                <td className="dist-table-style">
                  {formatDate(order.expectedDeliveryDate)}
                </td>
                <td className="dist-table-style">
                  {formatPrice(Number(order.amount))}
                </td>
                <td className="dist-table-style">{order.orderNumber}</td>
                <td className="dist-table-style">
                  <span
                    className={`${statusBg(order.status)} rounded p-1 font-[700] capitalize`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="dist-table-style">
                  {order.channel ? order.channel : "--"}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex flex-wrap justify-between gap-8">
            <div className="flex flex-col gap-2">
              <span className="font-[600]">Pickup Location:</span>
              <span className="flex gap-2">
                <Image
                  src="/images/icons/location.svg"
                  width={12}
                  height={17}
                  alt="location"
                />
                <span className="text-[0.875rem] font-medium">
                  {order?.seller.address}
                </span>
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-[600]">Delivery Address:</span>
              <span className="flex gap-2">
                <Image
                  src="/images/icons/location.svg"
                  width={12}
                  height={17}
                  alt="location"
                />
                <span className="text-[0.875rem] font-medium">
                  {order?.deliveryBranch.address}
                </span>
              </span>
            </div>
          </div>
          <div className="flex flex-wrap justify-between gap-8">
            <div className="flex flex-col gap-2">
              <span className="font-[600]">Payment Status:</span>
              <div className="flex gap-2">
                <Image
                  src="/images/icons/wallet.svg"
                  width={16}
                  height={12}
                  alt="location"
                />
                <div className="text-[0.875rem] font-medium">
                  {order?.isBuyerPaid ? (
                    <span className="flex gap-2">
                      <span className="text-primary-500">Complete</span>
                      <span>
                        {formatPrice(Number(order?.amount))} paid in full
                      </span>
                    </span>
                  ) : (
                    <span className="flex gap-2">
                      <span className="text-red-500">Unpaid</span>
                      <Link
                        href={`/buyer/sellers/order/${order?.id}`}
                        className="underline"
                      >
                        pay now
                      </Link>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10">
            {order.isBuyerPaid && order.status !== "delivered" ? (
              <Button className="border border-primary-500 hover:bg-red-100">
                Request Reversal
              </Button>
            ) : null}
            {!order.isdeliveryConfirmed && order.status === "delivered" ? (
              <Button
                onClick={() => setConfirmDeliveryDialogOpen(true)}
                className="border border-primary-500 hover:bg-red-100"
              >
                Confirm Delivery
              </Button>
            ) : null}
          </div>
          <div className="mb-6 w-full border" />
        </div>
      </div>
      <DialogWrapper
        title="Delivery Confirmation"
        customClose
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

export default BuyerOrderDetails;
