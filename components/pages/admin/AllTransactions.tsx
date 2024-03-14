"use client";

import React from "react";
import { Transaction } from "@prisma/client";
import AllTransactionTable from "@/components/shared/table/AllTransactionTable";

interface Props {
  transactions: Transaction[];
}

const AllTransactions = ({ transactions }: Props) => {
  return (
    <div className="w-full">
      <AllTransactionTable transactions={transactions} />
    </div>
  );
};

export default AllTransactions;
