"use client";

import React from "react";
import AnalyticsCircle from "../../shared/chart/AnalyticsCircle";
import SumCard from "@/components/shared/card/SumCard";

const BuyerBranchOverview = ({
  analytics,
  overview,
}: {
  analytics: {};
  overview: {};
}) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4">
        <SumCard title="Total Orders" icon="/images/icons/reserve-action.svg">
          <span className="text-[1.125rem] font-medium">
            {overview?.totalOrders ?? 0}
          </span>
        </SumCard>
        <SumCard
          title="Total Litres Purchased"
          icon="/images/icons/nozzle-black.svg"
        >
          <span className="text-[1.125rem] font-medium">
            {overview?.totalLitres ?? 0}
          </span>
        </SumCard>

        <SumCard title="Completed Orders" icon="/images/icons/actions.svg">
          <span className="text-[1.125rem] font-medium">
            {overview?.completedOrders ?? 0}
          </span>
        </SumCard>
        <SumCard title="Pending Orders" icon="/images/icons/actions.svg">
          <span className="text-[1.125rem] font-medium">
            {overview?.pendingOrders ?? 0}
          </span>
        </SumCard>
      </div>
      <div className="w-full rounded-md bg-light-900 px-10 py-6">
        <div className="mb-6 flex w-full flex-col gap-1">
          <span className="font-semibold">Purchase Analytics</span>
          <span className="text-[0.75rem] font-medium text-[#808494]">
            This month
          </span>
        </div>
        <div className="flex justify-center">
          <AnalyticsCircle
            a={analytics?.volumes ?? 0}
            b={analytics?.branchServiced ?? 0}
            c={analytics?.amountSpent ?? 0}
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
              <span className="font-semibold">{analytics?.volumes ?? 0}</span>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-block size-[10px] rounded-full bg-yellow-500"></span>
              <span className="text-[#808494]">Sellers Serviced :</span>
            </div>
            <div>
              <span className="font-semibold">
                {analytics?.branchServiced ?? 0}
              </span>
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
              <span className="font-semibold">
                {analytics?.amountSpent ?? 0}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerBranchOverview;
