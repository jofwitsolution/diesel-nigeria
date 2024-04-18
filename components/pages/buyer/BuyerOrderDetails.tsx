"use client";

import React from "react";
import { Order } from "@prisma/client";
import Image from "next/image";
import { formatDate, formatPrice, getTimeOfDay } from "@/lib/utils";
import { statusBg } from "@/styles/utils";
import Link from "next/link";
import RequestReversal from "./RequestReversal";
import CancelOrder from "./CancelOrder";
import ConfirmDelivery from "./ConfirmDelivery";
import OrderDetailsDownload from "@/components/shared/html-pdf/OrderDetailsDownload";

interface Props {
  order: Order;
}

const BuyerOrderDetails = ({ order }: Props) => {
  return (
    <>
      <div className="w-full rounded-md bg-light-900 px-2 py-3 md:p-6 lg:px-10">
        <div className="flex justify-between">
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

          <OrderDetailsDownload order={order} />
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
          <div className="mt-10 space-x-3">
            <RequestReversal order={order} />
            <CancelOrder order={order} />
            <ConfirmDelivery order={order} />
          </div>
          <div className="mb-6 w-full border" />
        </div>
      </div>
    </>
  );
};

export default BuyerOrderDetails;
