import { getOrders } from "@/lib/actions/user.action";
import { getCurrentUser } from "@/lib/helpers/auth";
import { formatDate } from "@/lib/utils";
import { statusBg } from "@/styles/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const mockOrders = [
  {
    id: "01",
    orderNumber: "23442",
    date: "2024-01-08T10:01:45.841+00:00",
    businessName: "Honeywell Petroleum",
    status: "success",
    litre: 20,
    avatar: "/images/icons/honeywell.svg",
  },
  {
    id: "02",
    orderNumber: "23442",
    date: "2024-01-08T10:01:45.841+00:00",
    businessName: "Honeywell Petroleum",
    status: "success",
    litre: 20,
    avatar: "/images/icons/honeywell.svg",
  },
  {
    id: "03",
    orderNumber: "23442",
    date: "2024-01-08T10:01:45.841+00:00",
    businessName: "Honeywell Petroleum",
    status: "progress",
    litre: 20,
    avatar: "/images/icons/honeywell.svg",
  },
];

const RecentTransactions = async () => {
  const currentUser = await getCurrentUser();
  const result = await getOrders(currentUser?.id as string, "desc", 3);

  return (
    <div className="w-full rounded-md bg-light-900 py-4">
      <div className="mb-6 flex w-full items-center justify-between px-3">
        <span className="font-semibold">Recent Orders</span>
        {result?.orders?.length > 0 && (
          <Link
            href="/buyer/orders"
            className="flex items-center gap-2 text-[0.75rem] text-primary-500"
          >
            See all
          </Link>
        )}
      </div>
      <div className="w-full">
        <table className="w-full text-[0.8125rem] text-[#5F6D7E]">
          <thead className="font-medium">
            <tr className="">
              <th className="ps-3 text-start">Supplier</th>
              <th className="text-start max-sm:hidden">Liter</th>
              <th className="text-start">Date</th>
              <th className="text-start max-sm:hidden">Order Number</th>
              <th className="text-start">Status</th>
            </tr>
          </thead>
          <tbody>
            {result?.orders?.length > 0 &&
              result?.orders?.map((order) => (
                <tr
                  key={order.id}
                  className="border-b text-start text-[0.75rem]"
                >
                  <td className="flex items-center justify-start gap-[0.675rem] py-3 ps-3">
                    <Image
                      src={
                        order?.seller?.avatar?.url ??
                        "/images/icons/db-left-avatar.svg"
                      }
                      width={27}
                      height={27}
                      alt="seller avatar"
                    />
                    <span className="font-medium">
                      {order.seller.businessName}
                    </span>
                  </td>
                  <td className="max-sm:hidden">{order.quantity} Litres</td>
                  <td className="">{formatDate(order.orderDate)}</td>
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

            {result?.orders?.length === 0 &&
              mockOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b text-start text-[0.75rem]"
                >
                  <td className="invisible flex items-center justify-start gap-[0.675rem] py-3 ps-3">
                    <Image
                      src={"/images/icons/honeywell.svg"}
                      width={27}
                      height={27}
                      alt="order"
                    />
                    <span className="font-medium">{order.businessName}</span>
                  </td>
                  <td className="invisible max-sm:hidden">
                    {order.litre} Litres
                  </td>
                  <td className="invisible">{formatDate(order.date)}</td>
                  <td className="invisible max-sm:hidden">
                    {order.orderNumber}
                  </td>
                  <td className="invisible pe-2">
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
      </div>
    </div>
  );
};

export default RecentTransactions;
