import { formatDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const transactions = [
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

const RecentTransactions = () => {
  const statusBg = (status: string) => {
    if (status === "success") return "bg-primary-50 text-primary-500";
    if (status === "progress") return "bg-yellow-200 text-yellow-500";
    if (status === "failed") return "bg-red-200 text-red-500";
  };
  return (
    <div className="w-full rounded-md bg-light-900 py-4">
      <div className="mb-6 flex w-full items-center justify-between px-3">
        <span className="font-semibold">Recent Transactions</span>
        <Link
          href="#"
          className="flex items-center gap-2 text-[0.75rem] text-primary-500"
        >
          See all
        </Link>
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
            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="border-b text-start text-[0.75rem]"
              >
                <td className="flex items-center justify-start gap-[0.675rem] py-3 ps-3">
                  <Image
                    src={"/images/icons/honeywell.svg"}
                    width={27}
                    height={27}
                    alt="transaction"
                  />
                  <span className="font-medium">
                    {transaction.businessName}
                  </span>
                </td>
                <td className="max-sm:hidden">{transaction.litre} Litres</td>
                <td className="">{formatDate(transaction.date)}</td>
                <td className="max-sm:hidden">{transaction.orderNumber}</td>
                <td className="pe-2">
                  <span
                    className={`${statusBg(transaction.status)} rounded p-1 font-[700]`}
                  >
                    {transaction.status}
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
