import AccountTabs from "@/components/pages/admin/AccountTabs";
import UpdatePrice from "@/components/pages/seller/UpdatePrice";
import React from "react";

const AccountPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex max-w-[69.125rem] justify-between">
        <div className="flex flex-col gap-2">
          <span className="font-medium md:text-[1.25rem]">Transactions</span>
          <span className="text-[0.875rem]">
            Here’s an overview of your payments and withdrawals
          </span>
        </div>
        <UpdatePrice />
      </div>
      <div>
        <AccountTabs />
      </div>
    </div>
  );
};

export default AccountPage;
