import React from "react";
import AllTransactions from "@/components/pages/admin/AllTransactions";
import { getAllTransactions } from "@/lib/actions/admin.action";

const Page = async () => {
  const result = await getAllTransactions();

  return (
    <div>
      <AllTransactions transactions={result.transactions ?? []} />
    </div>
  );
};

export default Page;
