import { formatDate, formatPrice } from "@/lib/utils";
import { statusBg } from "@/styles/utils";
import { Order } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  recentOrders: Order[];
}

const RecentOrders = ({ recentOrders }: Props) => {
  return (
    <div className="w-full rounded-md bg-light-900 py-4">
      <div className="mb-4 flex w-full items-center justify-between px-3">
        <span className="font-semibold">Recent Orders</span>
        <Link
          href="/admin/orders"
          className="flex items-center gap-2 text-[0.75rem] text-primary-500"
        >
          See all
        </Link>
      </div>
      <div className="w-full">
        <table className="w-full text-[0.55rem] text-[#5F6D7E] xs:text-[0.8125rem]">
          <thead className="font-medium">
            <tr className="border-y">
              <th className="py-3 ps-3 text-start">Customer</th>
              <th className="py-3 text-start max-sm:hidden">Liter</th>
              <th className="py-3 text-start">Date</th>
              <th className="line-clamp-1 py-3 text-start">Delivery Date</th>
              <th className="py-3 text-start">Amount</th>
              <th className="py-3 text-start max-sm:hidden">Order Number</th>
              <th className="py-3 text-start">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr
                key={order.id}
                className="border-b text-start text-[0.5rem] xs:text-[0.75rem]"
              >
                <td className="flex items-center justify-start gap-[0.675rem] py-3 ps-3">
                  <Image
                    src={
                      order?.buyer?.avatar
                        ? order?.buyer?.avatar.url
                        : "/images/icons/db-left-avatar.svg"
                    }
                    width={27}
                    height={27}
                    alt={order.businessName}
                    className="max-sm:hidden"
                  />
                  <span className="font-medium">{order.businessName}</span>
                </td>
                <td className="max-sm:hidden">{order.quantity} Litres</td>
                <td className="">{formatDate(order.orderDate)}</td>
                <td className="">{formatDate(order.expectedDeliveryDate)}</td>
                <td className="">{formatPrice(Number(order.amount))}</td>
                <td className="max-sm:hidden">{order.orderNumber}</td>
                <td className="pe-2">
                  <span
                    className={`${statusBg(order.status)} rounded p-1 font-[700] capitalize`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {recentOrders.length === 0 && (
          <div className="flex h-20 w-full items-center justify-center font-medium">
            <p>No available order</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentOrders;
