import { Button } from "@/components/ui/button";
import { formatPrice, getSimpleDateTime } from "@/lib/utils";
import { Transaction } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SettledTransactions = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  return (
    <div className="w-full rounded-md bg-light-900 px-2 py-4 md:px-3">
      <div className="flex flex-col gap-1">
        <span className="text-[0.875rem] font-medium">
          Settled transactions
        </span>
        <span className="text-[0.75rem] font-medium text-[#8798AD]">
          Showing transactions in the past hour
        </span>
      </div>
      <div className="mt-4 flex flex-col gap-1">
        {transactions?.length > 0 ? (
          transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between gap-6 rounded-md bg-[#F9FAFB] px-2 py-3 xs:px-4"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex size-[2rem] items-center justify-center rounded-full ${transaction.category === "commision" ? "bg-primary-100" : "bg-red-200"}`}
                >
                  <Image
                    src={
                      transaction.category === "commision"
                        ? "/images/icons/naira-in-green.svg"
                        : "/images/icons/naira-out-red.svg"
                    }
                    width={20}
                    height={20}
                    alt="naira"
                    className=""
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="line-clamp-1 text-[0.875rem] font-semibold">
                    {transaction?.buyer?.businessName ??
                      transaction?.seller.businessName}
                  </span>

                  <span className="text-[0.75rem] font-semibold text-[#8798AD]">
                    {getSimpleDateTime(transaction.date)}
                  </span>
                  <span className="text-[0.875rem] font-semibold capitalize text-[#8798AD]">
                    {transaction.category}
                  </span>
                </div>
              </div>
              <span className="text-[0.875rem] font-[700]">
                {formatPrice(Number(transaction.amount))}
              </span>
            </div>
          ))
        ) : (
          <div className="flex h-[15rem] items-center justify-center">
            <p>No Transaction</p>
          </div>
        )}
      </div>
      <div className="mt-4">
        <Link href="/admin/transactions">
          <Button className="flex h-[2.2rem] w-full items-center justify-center rounded-md border border-primary-500 font-semibold text-primary-500 hover:border-primary-100 md:h-[3rem]">
            View all Transactions
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SettledTransactions;
