import React from "react";
import DBSearchDistributor from "@/components/shared/search/DBSearchDistributor";
import TopSellers from "@/components/shared/TopSellers";
import RecentTransactions from "@/components/shared/table/RecentTransactions";
import PurchaseAnalytics from "@/components/pages/buyer/PurchaseAnalytics";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CalendarOrder from "@/components/pages/buyer/CalendarOrder";

const OverviewPage = () => {
  return (
    <div className="flex max-w-[73.125rem] gap-6">
      <div className="mx-auto space-y-6 sm:w-[38rem] md:w-[42.9375rem]">
        <DBSearchDistributor />
        <TopSellers />
        <RecentTransactions />
        <PurchaseAnalytics />
      </div>
      <div className="hidden max-w-[28.0625rem] space-y-6 xl:block">
        <div className="flex justify-end">
          <Link href="/buyer/sellers">
            <Button className="bg-primary-500 px-[2.5625rem] py-[0.5625rem] text-light-900 hover:bg-primary-400">
              Buy Deisel
            </Button>
          </Link>
        </div>
        <CalendarOrder />
      </div>
    </div>
  );
};

export default OverviewPage;
