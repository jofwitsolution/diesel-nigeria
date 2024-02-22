import React from "react";
import SummaryCards from "@/components/pages/admin/SummaryCards";
import RevenueBoard from "@/components/pages/admin/RevenueBoard";
import AdminCalendar from "@/components/pages/admin/AdminCalendar";
import RetentionBoard from "@/components/pages/admin/RetentionBoard";
import RecentOrders from "@/components/shared/table/RecentOrders";

const OverviewPage = async () => {
  return (
    <div className="max-w-[72.625rem] space-y-6">
      <div className="flex gap-6">
        <div className="mx-auto max-w-[42.9375rem]">
          <SummaryCards />
        </div>
        <div className="hidden max-w-[28.0625rem] grow space-y-6 xl:block">
          <AdminCalendar />
        </div>
      </div>
      <div className="">
        <RevenueBoard />
      </div>
      <div className="">
        <RetentionBoard />
      </div>
      <div className="">
        <RecentOrders />
      </div>
    </div>
  );
};

export default OverviewPage;
