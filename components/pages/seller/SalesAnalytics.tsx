import React from "react";
import AnalyticsCircle from "@/components/shared/chart/AnalyticsCircle";
import { getSalesAnalytics } from "@/lib/actions/seller.action";

const SalesAnalytics = async () => {
  const result = await getSalesAnalytics();

  return (
    <div className="w-full rounded-md bg-light-900 px-10 py-6">
      <div className="mb-6 flex w-full flex-col gap-1">
        <span className="font-semibold">Sales Analytics</span>
        <span className="text-[0.75rem] font-medium text-[#808494]">
          This month
        </span>
      </div>
      <div className="flex justify-center">
        <AnalyticsCircle
          a={result?.volumes ?? 0}
          b={result?.buyersServiced ?? 0}
          c={result?.sales ?? 0}
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
            <span className="text-[#808494]">Buyers Serviced :</span>
          </div>
          <div>
            <span className="font-semibold">{result?.buyersServiced ?? 0}</span>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block size-[10px] rounded-full bg-red-500"></span>
            <span className="text-[#808494]">Sales (₦)</span>
          </div>
          <div>
            <span className="font-semibold">{result?.sales ?? 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesAnalytics;
