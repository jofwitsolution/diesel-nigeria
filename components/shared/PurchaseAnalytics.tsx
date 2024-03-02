import React from "react";
import AnalyticsCircle from "./chart/AnalyticsCircle";
import { getPurchaseAnalytics } from "@/lib/actions/buyer.action";

const PurchaseAnalytics = async () => {
  const result = await getPurchaseAnalytics();

  return (
    <div className="w-full rounded-md bg-light-900 px-10 py-6">
      <div className="mb-6 flex w-full flex-col gap-1">
        <span className="font-semibold">Purchase Analytics</span>
        <span className="text-[0.75rem] font-medium text-[#808494]">
          This month
        </span>
      </div>
      <div className="flex justify-center">
        <AnalyticsCircle
          a={result?.volumes ?? 0}
          b={result?.branchServiced ?? 0}
          c={result?.amountSpent ?? 0}
        />
      </div>
      <div className="my-3 border" />
      <div className="space-y-3 text-[0.75rem]">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block size-[10px] rounded-full bg-primary-500"></span>
            <span className="text-[#808494]">Volume (Ltrs) :</span>
          </div>
          <div>
            <span className="font-semibold">{result?.volumes ?? 0}</span>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block size-[10px] rounded-full bg-yellow-500"></span>
            <span className="text-[#808494]">Branch Serviced :</span>
          </div>
          <div>
            <span className="font-semibold">{result?.branchServiced ?? 0}</span>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block size-[10px] rounded-full bg-red-500"></span>
            <span className="text-[#808494]">
              Total Amount Spent on Diesel (₦)
            </span>
          </div>
          <div>
            <span className="font-semibold">{result?.amountSpent ?? 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseAnalytics;
