"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountManagement from "./AccountManagement";
import SettledTransactions from "./SettledTransactions";
import PaymentOverview from "./PaymentOverview";

const AccountTabs = () => {
  return (
    <div>
      <Tabs defaultValue="overview" className="1332px:w-[67.125rem]">
        <TabsList className="xs:w-full lg:w-[45rem]">
          <TabsTrigger
            value="overview"
            className="flex-1 border data-[state=active]:bg-primary-500 data-[state=active]:font-[700] data-[state=active]:text-light-900 max-xs:px-2 max-xs:text-[0.7rem]"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="payments"
            className="flex-1 border data-[state=active]:bg-primary-500 data-[state=active]:font-[700] data-[state=active]:text-light-900 max-xs:px-2 max-xs:text-[0.7rem]"
          >
            Payments
          </TabsTrigger>
          <TabsTrigger
            value="withdrawal"
            className="flex-1 border data-[state=active]:bg-primary-500 data-[state=active]:font-[700] data-[state=active]:text-light-900 max-xs:px-2 max-xs:text-[0.7rem]"
          >
            Withdrawal
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="w-full space-y-6">
          <AccountManagement />
          <div className="flex w-full flex-col gap-6 lg:flex-row">
            <div className="w-full lg:w-[40%]">
              <SettledTransactions />
            </div>
            <div className="w-full lg:w-[60%]">
              <PaymentOverview />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AccountTabs;