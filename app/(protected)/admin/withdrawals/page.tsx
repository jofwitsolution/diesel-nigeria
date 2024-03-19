import React from "react";
import AllWithdrawalRequests from "@/components/pages/admin/AllWithdrawalRequests";
import { getAllWithdrawalRequests } from "@/lib/actions/admin.action";

const Page = async () => {
  const result = await getAllWithdrawalRequests();

  return (
    <div>
      <AllWithdrawalRequests
        withdrawalRequests={result.withdrawalRequests ?? []}
      />
    </div>
  );
};

export default Page;
