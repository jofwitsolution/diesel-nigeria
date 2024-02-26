"use client";

import { Button } from "@/components/ui/button";
import {
  formatDate,
  formatPrice,
  formatPriceNGN,
  getTimeOfDay,
} from "@/lib/utils";
import { statusBg } from "@/styles/utils";
import { Order as OrderModel } from "@prisma/client";
import Image from "next/image";
import React from "react";

interface Props {
  order: OrderModel;
}

const CurrentOrder = ({ order }: Props) => {
  return (
    <div className="w-full rounded-md bg-light-900 px-2 py-3 text-[0.875rem] md:p-6 lg:px-10">
      <div className="mb-3 flex flex-col justify-between border-b-2 pb-3 xs:flex-row xs:items-center">
        <div className="flex flex-col gap-2 font-medium text-[#5F6D7E] max-md:text-[0.875rem]">
          <Image
            src={
              order.seller?.avatar
                ? order.seller.avatar.url
                : "/images/icons/db-left-avatar.svg"
            }
            width={100}
            height={75}
            alt={"logo"}
            className=""
          />
          <span className="">{order.seller.businessName}</span>
          <div className="flex gap-3">
            <span className="flex items-center gap-2">
              <Image
                src="/images/icons/like.svg"
                width={14}
                height={12}
                alt="like"
              />
              90%
            </span>
            <span className="flex items-center gap-2">
              <Image
                src="/images/icons/clock-dark.svg"
                width={14}
                height={12}
                alt="time"
              />
              within 30&apos;
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 max-sm:hidden">
          <div className="flex flex-col gap-[3px]">
            <span className="font-medium">{formatDate(order.orderDate)}</span>
            <span className="font-medium text-primary-500">
              {getTimeOfDay(order.orderDate)}
            </span>
          </div>
          <span className="text-[#5F6D7E]">RC {order.seller.rcNumber}</span>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <span className="font-[600]">Delivery Address:</span>
        <span className="flex gap-2 text-[#5F6D7E]">
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

      <div className="mt-8">
        <table className="overflow-hidden">
          <thead>
            <tr className="bg-[#808494] text-left text-[0.4rem] font-medium text-light-900 xs:text-[0.8125rem]">
              <th className="dist-table-style w-[24.625rem]">Product</th>
              <th className="dist-table-style w-[24.625rem]">
                Number of Litres
              </th>
              <th className="dist-table-style w-[24.625rem]">Rate</th>
            </tr>
          </thead>
          <tbody className="">
            <tr className="border-b text-[0.4rem] max-xs:font-medium xs:text-[0.8125rem]">
              <td className="dist-table-style">
                Diesel {order.product.density}g/ml
              </td>
              <td className="dist-table-style">{order.quantity}Litres</td>
              <td className="dist-table-style">
                NGN {order.product.price}/Litre
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex w-full justify-end max-xs:justify-center">
        <div className="flex flex-col gap-3 rounded-xl bg-[#E4E4E4] p-3">
          <div className="flex justify-between gap-8">
            <span className="font-[600]">Total Rate</span>
            <span>{formatPriceNGN(Number(order.totalRate))}</span>
          </div>
          <div className="flex justify-between gap-8">
            <span className="font-[600]">Delivery Charge</span>
            <span>{formatPriceNGN(Number(order.deliveryCharge))}</span>
          </div>
          <div className="flex justify-between gap-8">
            <span className="font-[600]">Service Charge</span>
            <span>{formatPriceNGN(Number(order.serviceCharge))}</span>
          </div>
          <div className="flex justify-between gap-8">
            <span className="font-[600]">Total</span>
            <span>{formatPriceNGN(Number(order.amount))}</span>
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap justify-between gap-8 max-xs:justify-center md:mt-20">
        <Button className="border border-primary-500 font-medium hover:bg-primary-100">
          Edit your Order
        </Button>
        <Button className="bg-primary-500 font-medium text-light-900 active:bg-primary-100">
          Proceed to Payment
        </Button>
      </div>
      <div className="my-4 w-full border-b" />
    </div>
  );
};

export default CurrentOrder;
