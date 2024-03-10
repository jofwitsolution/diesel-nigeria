import AccountTabs from "@/components/pages/admin/AccountTabs";
import {
  adminGetTransactionOverview,
  getAdminWalletData,
  getAllTransactions,
} from "@/lib/actions/admin.action";
import React from "react";

const AccountPage = async () => {
  const walletDataResult = await getAdminWalletData();
  const transactionResult = await getAllTransactions("desc");
  const transactionForYearResult = await adminGetTransactionOverview();

  return (
    <div className="space-y-6">
      <div className="max-w-[69.125rem]">
        <div className="flex flex-col gap-2">
          <span className="font-medium md:text-[1.25rem]">Transactions</span>
          <span className="text-[0.875rem]">
            Here’s an overview of your payments and withdrawals
          </span>
        </div>
      </div>
      <div>
        <AccountTabs
          transactionsForCurrentYear={
            transactionForYearResult.transactionsForYear ?? []
          }
          transactions={transactionResult.transactions ?? []}
          walletData={{
            balance: walletDataResult.balance ?? 0,
            totalPayment: walletDataResult.totalPayment ?? 0,
            totalWithdrawal: walletDataResult.totalWithdrawal ?? 0,
          }}
        />
      </div>
    </div>
  );
};

export default AccountPage;
