import { Button } from "@/components/ui/button";
import React from "react";

const AccountManagement = () => {
  return (
    <div className="mt-6 w-full space-y-6 rounded-lg bg-light-900 p-3">
      <div className="flex justify-between">
        <div className="flex flex-col gap-1">
          <span className="font-medium md:text-[1.125rem]">
            Account Management
          </span>
          <span className="text-[0.75rem] font-medium">
            Here’s an overview of your payments
          </span>
        </div>
        <div>
          <Button className="h-[2.375rem] border border-primary-500 px-6 font-[700] text-primary-500">
            Withdraw Funds
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <div className="flex h-[5.25rem] flex-[39%] flex-col gap-3 rounded-md border bg-primary-500 px-4 py-3 text-light-900">
          <span>Wallet Balance</span>
          <span>Naira</span>
        </div>
        <div className="flex h-[5.25rem] flex-[23%] flex-col gap-3 rounded-md border px-4 py-3">
          <span>Wallet Balance</span>
          <span>Naira</span>
        </div>
        <div className="flex h-[5.25rem] flex-[23%] flex-col gap-3 rounded-md border px-4 py-3">
          <span>Wallet Balance</span>
          <span>Naira</span>
        </div>
      </div>
    </div>
  );
};

export default AccountManagement;
