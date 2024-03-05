"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { getSellerWalletData } from "@/lib/actions/seller.action";
import DialogWrapper from "@/components/shared/dialog/DialogWrapper";

const SellerAccountManagement = () => {
  const [walletData, setWalletData] = useState({
    balance: 0,
    totalPayment: 0,
    totalWithdrawal: 0,
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchWalletData = async () => {
      const result = await getSellerWalletData();
      if (!result?.success) {
        setWalletData({
          balance: result.balance!,
          totalPayment: result.totalPayment!,
          totalWithdrawal: result.totalWithdrawal!,
        });
      }
    };

    fetchWalletData();
  }, []);

  return (
    <>
      <div className="mt-6 w-full space-y-6 rounded-lg bg-light-900 p-3">
        <div className="flex flex-wrap justify-between gap-6">
          <div className="flex flex-col gap-1">
            <span className="font-medium md:text-[1.125rem]">
              Account Management
            </span>
            <span className="text-[0.75rem] font-medium text-[#8798AD]">
              Here’s an overview of your payments
            </span>
          </div>
          <div>
            <Button
              onClick={() => setIsDialogOpen(true)}
              className="h-[2.375rem] border border-primary-500 px-6 font-[700] text-primary-500 active:bg-primary-100"
            >
              Withdraw Funds
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="max-xs:[35%] flex h-[5.25rem] flex-[29%] flex-col gap-1 rounded-md border bg-primary-500 px-2 py-3 text-light-900 md:flex-[39%] md:px-4">
            <span className="text-nowrap text-[0.75rem] font-medium">
              Wallet Balance
            </span>
            <span className="text-[1.5rem] font-medium leading-[1.6rem] lg:text-[2.5rem] lg:leading-[2.6rem]">
              {formatPrice(walletData.balance)}
            </span>
          </div>
          <div className="flex h-[5.25rem] flex-[28%] flex-col gap-2 rounded-md border px-2 py-3 max-xs:flex-[50%] md:flex-[23%] md:px-4">
            <span className="flex shrink-0 justify-between gap-4 text-nowrap">
              <span className="text-[0.875rem] font-semibold">
                Total Payment
              </span>
              <Image
                src="/images/icons/naira-in.svg"
                width={20}
                height={20}
                alt="naira in"
              />
            </span>
            <span className="font-medium lg:text-[1.25rem]">
              {formatPrice(walletData.totalPayment)}
            </span>
          </div>
          <div className="flex h-[5.25rem] flex-[28%] flex-col gap-2 rounded-md border px-2 py-3 md:flex-[23%] md:px-4">
            <span className="flex shrink-0 justify-between gap-4 text-nowrap">
              <span className="text-[0.875rem] font-semibold">
                Total Withdrawal
              </span>
              <Image
                src="/images/icons/naira-out.svg"
                width={20}
                height={20}
                alt="naira in"
              />
            </span>
            <span className="font-medium lg:text-[1.25rem]">
              {formatPrice(walletData.totalWithdrawal)}
            </span>
          </div>
        </div>
      </div>
      <DialogWrapper
        dialogState={isDialogOpen}
        handleDialogState={() => {
          setIsDialogOpen(!isDialogOpen);
        }}
        title="Withdraw Funds"
        customClose={true}
        containerStyle="max-sm:w-[18.75rem] sm:max-w-[24.75rem]"
      >
        <div>Form</div>
      </DialogWrapper>
    </>
  );
};

export default SellerAccountManagement;
