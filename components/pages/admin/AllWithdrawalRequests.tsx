"use client";

import React from "react";
import { WithdrawalRequest } from "@prisma/client";
import AllWithdrawalTable from "@/components/shared/table/AllWithdrawalTable";

interface Props {
  withdrawalRequests: WithdrawalRequest[];
}

const AllWithdrawalRequests = ({ withdrawalRequests }: Props) => {
  return (
    <div className="w-full">
      <AllWithdrawalTable withdrawalRequests={withdrawalRequests} />
    </div>
  );
};

export default AllWithdrawalRequests;
