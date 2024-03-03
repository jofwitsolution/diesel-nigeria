"use client";

import React, { useState, useTransition } from "react";
import { Order } from "@prisma/client";
import Image from "next/image";
import { formatDate, formatPrice, getTimeOfDay } from "@/lib/utils";
import { statusBg } from "@/styles/utils";
import { Checkbox } from "@/components/ui/checkbox";
import DialogWrapper from "@/components/shared/dialog/DialogWrapper";
import { Button } from "@/components/ui/button";
import LoaderOverlay from "@/components/LoaderOverlay";
import { sellerUpdateOrderStatus } from "@/lib/actions/seller.action";
import { toast } from "sonner";
import { usePathname } from "next/navigation";

interface Props {
  order: Order;
}

const SellerOrderDetails = ({ order }: Props) => {
  const pathname = usePathname();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState("");
  const [isPending, startTransition] = useTransition();

  const updateOrderStatus = async () => {
    startTransition(() => {
      sellerUpdateOrderStatus(order?.id, orderStatus, pathname).then((data) => {
        // if no error
        if (data?.error) {
          setIsDialogOpen(false);
          toast.error(data.error);
        }
        if (data?.success) {
          setIsDialogOpen(false);
          toast.success(data.success);
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
              order?.buyer.avatar
                ? order.buyer.avatar.url
                : "/images/icons/db-left-avatar.svg"
            }
            width={40}
            height={30}
            alt={order?.buyer.businessName}
            className=""
          />
          {order?.buyer.businessName}
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
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          {order.isBuyerPaid && order.status !== "delivered" ? (
            <div className="flex flex-wrap justify-between gap-8">
              <div className="flex flex-col gap-2">
                <span className="font-[600]">Update Order Status:</span>
                {order.status === "pending" && (
                  <div className="flex items-center justify-between space-x-2 text-[0.875rem] md:w-[13rem]">
                    <label
                      htmlFor="progress"
                      className="text-[#5F6D7E] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Pick Up
                    </label>
                    <Checkbox
                      id="progress"
                      onCheckedChange={(checked) => {
                        setOrderStatus("progress");
                        // if checked open dialog
                        if (checked) {
                          setIsDialogOpen(true);
                        }
                      }}
                      checked={orderStatus === "progress"}
                    />
                  </div>
                )}
                {order.status === "progress" && (
                  <div className="flex items-center justify-between space-x-2 text-[0.875rem] md:w-[13rem]">
                    <label
                      htmlFor="delivered"
                      className="text-[#5F6D7E] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Delivered
                    </label>
                    <Checkbox
                      id="delivered"
                      onCheckedChange={(checked) => {
                        setOrderStatus("delivered");

                        // if checked open dialog
                        if (checked) {
                          setIsDialogOpen(true);
                        }
                      }}
                      checked={orderStatus === "delivered"}
                    />
                  </div>
                )}
              </div>
            </div>
          ) : null}
          <div className="mb-6 w-full border" />
        </div>
      </div>
      <DialogWrapper
        title="Update Order Status"
        dialogState={isDialogOpen}
        handleDialogState={() => {
          setIsDialogOpen(!isDialogOpen);
          setOrderStatus("");
        }}
        containerStyle="max-sm:w-[18.75rem] sm:max-w-[24.375rem]"
      >
        <div className="space-y-2">
          <p>Are you sure you want to update order status to {orderStatus}?</p>
          <p className="text-[0.8rem]">Note: You cannot undo this action.</p>
        </div>
        <div className="mt-3 flex justify-between">
          <Button
            disabled={isPending}
            onClick={updateOrderStatus}
            className="h-[2rem] w-full rounded-[4px] bg-primary-500 px-4 font-fraunces text-light-900 active:bg-primary-100"
          >
            Confirm
          </Button>
        </div>
      </DialogWrapper>
      {isPending && <LoaderOverlay type="cliploader" size={40} />}
    </>
  );
};

export default SellerOrderDetails;
