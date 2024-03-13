"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SumCard from "@/components/shared/card/SumCard";
import { formatPrice } from "@/lib/utils";
import { Order } from "@prisma/client";
import AdminBuyerOrders from "@/components/shared/table/AdminBuyerOrders";

interface Props {
  orders: Order[];
  overviewData: {
    totalBranches: number;
    totalOrders: number;
    transactionsAmount: number;
    totalTransactions: number;
    completedOrders: number;
    pendingOrders: number;
  };
}

const BuyerPageTabs = ({ overviewData, orders }: Props) => {
  return (
    <div>
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="xs:w-full lg:w-[45rem]">
          <TabsTrigger
            value="overview"
            className="flex-1 border data-[state=active]:bg-primary-500 data-[state=active]:font-[700] data-[state=active]:text-light-900 max-xs:px-2 max-xs:text-[0.7rem]"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="orders"
            className="flex-1 border data-[state=active]:bg-primary-500 data-[state=active]:font-[700] data-[state=active]:text-light-900 max-xs:px-2 max-xs:text-[0.7rem]"
          >
            Orders
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-6 w-full">
          <div className="flex flex-wrap gap-4 pb-20">
            <SumCard title="Branches" icon="/images/icons/branch.svg">
              <span className="text-[1.125rem] font-medium">
                {" "}
                {overviewData.totalBranches}
              </span>
            </SumCard>
            <SumCard
              title="Total transactions value"
              icon="/images/icons/money.svg"
            >
              <span className="font-medium">
                {formatPrice(overviewData.transactionsAmount)}
              </span>
              <span className="text-[0.75rem] text-[#808494]">
                from last 48 hours
              </span>
            </SumCard>
            <SumCard
              title="Total transaction Volume (Ltrs)"
              icon="/images/icons/coins.svg"
            >
              <span className="font-medium">
                {overviewData.totalTransactions}
              </span>
              <span className="text-[0.75rem] text-[#808494]">
                from last month
              </span>
            </SumCard>
            <SumCard
              title="Total Orders"
              icon="/images/icons/reserve-action.svg"
            >
              <span className="text-[1.125rem] font-medium">
                {overviewData.totalOrders}
              </span>
            </SumCard>
            <SumCard title="Completed Orders" icon="/images/icons/actions.svg">
              <span className="text-[1.125rem] font-medium">
                {overviewData.completedOrders}
              </span>
            </SumCard>
            <SumCard title="Pending Orders" icon="/images/icons/actions.svg">
              <span className="text-[1.125rem] font-medium">
                {overviewData.pendingOrders}
              </span>
            </SumCard>
          </div>
        </TabsContent>
        <TabsContent value="orders" className="w-full">
          <div className="w-full">
            <AdminBuyerOrders orders={orders} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BuyerPageTabs;
