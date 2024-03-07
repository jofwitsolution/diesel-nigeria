"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SellerAccountManagement from "./SellerAccountManagement";
import SellerRecentTransactions from "./SellerRecentTransactions";
import SellerPaymentOverview from "./SellerPaymentOverview";
import { Transaction, WithdrawalRequest } from "@prisma/client";
import SellerPayments from "@/components/shared/table/SellerPayments";
import SellerWithdrawalRequest from "@/components/shared/table/SellerWithdrawalRequest";

interface Props {
  transactions: Transaction[];
  payments: {
    amount: string;
    date: Date;
  }[];
  withdrawals: WithdrawalRequest[];
  walletData: {
    balance: number;
    totalPayment: number;
    totalWithdrawal: number;
    accountNumber: string;
    bank: string;
  };
}

const SellerAccountTabs = ({
  transactions,
  payments,
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
        <TabsContent value="overview" className="w-full">
          <SellerAccountManagement
            balance={walletData.balance}
            accountNumber={walletData.accountNumber}
            bank={walletData.bank}
            totalPayment={walletData.totalPayment}
            totalWithdrawal={walletData.totalWithdrawal}
          />
          <div className="mt-6 flex w-full flex-col gap-6 lg:flex-row">
            <div className="w-full lg:w-[40%]">
              <SellerRecentTransactions transactions={transactions} />
            </div>
            <div className="w-full lg:w-[60%]">
              <SellerPaymentOverview payments={payments} />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="payments" className="w-full">
          <SellerPayments transactions={transactions} />
        </TabsContent>
        <TabsContent value="withdrawal" className="w-full">
          <SellerWithdrawalRequest withdrawals={withdrawals} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SellerAccountTabs;
