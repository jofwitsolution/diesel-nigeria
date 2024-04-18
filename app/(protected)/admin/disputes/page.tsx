import React from "react";
import DisputeTabs from "@/components/pages/admin/DisputeTabs";
import { getAllReversals } from "@/lib/actions/reversal.action";

const Page = async () => {
  const reversalResult = await getAllReversals();

  return (
    <div className="max-w-[73.125rem] space-y-6">
      <div className="flex w-full justify-between">
        <div className="flex flex-col gap-2">
          <span className="font-medium md:text-[1.25rem]">Disputes</span>
          <span className="text-[0.875rem]">Settle all disputes</span>
        </div>
      </div>
      <div className="w-full">
        <DisputeTabs reversals={reversalResult?.reversals ?? []} />
      </div>
    </div>
  );
};

export default Page;
