"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountManagement from "./AccountManagement";

const AccountTabs = () => {
  return (
    <div>
      <Tabs defaultValue="overview" className="xl:w-[67.125rem]">
        <TabsList className="w-full lg:w-[45rem]">
          <TabsTrigger
            value="overview"
            className="flex-1 border data-[state=active]:bg-primary-500 data-[state=active]:font-[700] data-[state=active]:text-light-900"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="payments"
            className="flex-1 border data-[state=active]:bg-primary-500 data-[state=active]:font-[700] data-[state=active]:text-light-900"
          >
            Payments
          </TabsTrigger>
          <TabsTrigger
            value="withdrawal"
            className="flex-1 border data-[state=active]:bg-primary-500 data-[state=active]:font-[700] data-[state=active]:text-light-900"
          >
            Withdrawal
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="w-full" asChild>
          <AccountManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AccountTabs;
