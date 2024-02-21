"use client";

import React, { useState } from "react";
import BuyerAddBranchForm from "@/components/forms/BuyerAddBranchForm";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const BranchTopLayout = () => {
  const [addSellerDialog, setAddSellerDialog] = useState(false);
  return (
    <>
      <div className="mb-6 flex w-full justify-between gap-6 max-xs:flex-col">
        <div className="flex flex-col gap-2">
          <span className="font-medium md:text-[1.25rem]">Branches</span>
          <span className="text-[0.875rem]">
            Here’s a list of your branches
          </span>
        </div>
        <Button
          onClick={() => setAddSellerDialog(true)}
          className="w-max space-x-2 bg-primary-500 px-6 font-[600] text-light-900 max-xs:px-3"
        >
          <Image
            src="/images/icons/plus.svg"
            width={15}
            height={15}
            alt="add"
          />{" "}
          <span>Add New Branch</span>
        </Button>
      </div>
      <BuyerAddBranchForm
        dialogState={addSellerDialog}
        handleDialogState={() => setAddSellerDialog(!addSellerDialog)}
      />
    </>
  );
};

export default BranchTopLayout;
