"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountManagement from "./AccountManagement";
import SettledTransactions from "./SettledTransactions";
import PaymentOverview from "./PaymentOverview";
import { Transaction, WithdrawalRequest } from "@prisma/client";

interface Props {
  transactions: Transaction[];
  transactionsForCurrentYear: {
    amount: string;
    date: Date;
  }[];
  withdrawals: WithdrawalRequest[];
  walletData: {
    balance: number;
    totalPayment: number;
    totalWithdrawal: number;
  };
}

const AccountTabs = ({
  transactions,
  transactionsForCurrentYear,
  withdrawals,
  walletData,
}: Props) => {
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
            value="withdrawal"
            className="flex-1 border data-[state=active]:bg-primary-500 data-[state=active]:font-[700] data-[state=active]:text-light-900 max-xs:px-2 max-xs:text-[0.7rem]"
          >
            Withdrawal Request
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="w-full space-y-6">
          <AccountManagement
            balance={walletData.balance}
            totalPayment={walletData.totalPayment}
            totalWithdrawal={walletData.totalWithdrawal}
          />
          <div className="flex w-full flex-col gap-6 lg:flex-row">
            <div className="w-full lg:w-[40%]">
              <SettledTransactions transactions={transactions.slice(0, 3)} />
            </div>
            <div className="w-full lg:w-[60%]">
              <PaymentOverview
                transactionsForCurrentYear={transactionsForCurrentYear}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AccountTabs;
