import React from "react";
import CalendarOrder from "@/components/pages/seller/CalendarOrder";
import UpdatePrice from "@/components/pages/seller/UpdatePrice";
import SellerSummaryCards from "@/components/pages/seller/SellerSummaryCards";
import SalesAnalytics from "@/components/pages/seller/SalesAnalytics";

const OverviewPage = async () => {
  return (
    <div className="space-y-6">
      <div className="flex max-w-[73.125rem] justify-between">
        <div className="flex flex-col gap-2">
          <span className="font-medium md:text-[1.25rem]">Overview</span>
          <span className="text-[0.875rem]">
            Here’s an overview of your sales
          </span>
        </div>
        <div className="flex justify-end">
          <UpdatePrice />
        </div>
      </div>
      <div className="flex gap-6">
        <div className="mx-auto space-y-6 sm:w-[38rem] md:w-[42.9375rem]">
          <SellerSummaryCards />
          <SalesAnalytics />
        </div>
        <div className="hidden max-w-[28.0625rem] space-y-6 xl:block">
          <CalendarOrder />
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
