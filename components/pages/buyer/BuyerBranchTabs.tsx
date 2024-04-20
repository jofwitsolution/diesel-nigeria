"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Order } from "@prisma/client";
import BuyerBranchOverview from "./BuyerBranchOverview";
import BuyerBranchOrders from "@/components/shared/table/BuyerBranchOrders";

interface Props {
  analyticsData: {};
  overviewData: {};
  orders: Order[];
}

const BuyerBranchTabs = ({ analyticsData, overviewData, orders }: Props) => {
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
          <div>
            <BuyerBranchOverview
              overview={overviewData}
              analytics={analyticsData}
            />
          </div>
        </TabsContent>
        <TabsContent value="orders" className="mt-6 w-full">
          <div>
            <BuyerBranchOrders orders={orders} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BuyerBranchTabs;
