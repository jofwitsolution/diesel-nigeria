import React from "react";
import SellerAccountTabs from "@/components/pages/seller/SellerAccountTabs";
import { getCurrentUser } from "@/lib/helpers/auth";
import { getTransactions } from "@/lib/actions/user.action";
import {
  getPaymentOverview,
  getSellerWithdrawals,
} from "@/lib/actions/seller.action";

const AccountPage = async () => {
  const currentUser = await getCurrentUser();
  const transactionResult = await getTransactions(currentUser?.id!, "desc", 4);
  const paymentResult = await getPaymentOverview();
  const withdrawalResult = await getSellerWithdrawals();

  return (
    <div className="space-y-6">
      <div className="flex max-w-[69.125rem] justify-between">
        <div className="flex flex-col gap-2">
          <span className="font-medium md:text-[1.25rem]">Transactions</span>
          <span className="text-[0.875rem]">
            Here’s an overview of your payments and withdrawals
          </span>
        </div>
      </div>
      <div>
        <SellerAccountTabs
          transactions={transactionResult.transactions ?? []}
          payments={paymentResult.payments ?? []}
          withdrawals={withdrawalResult.withdrawals ?? []}
        />
      </div>
    </div>
  );
};

export default AccountPage;
