import PaymentChart from "@/components/shared/chart/PaymentChart";
import React from "react";

const PaymentOverview = () => {
  return (
    <div className="w-full rounded-md bg-light-900 p-4">
      <div className="flex flex-col gap-1">
        <span className="text-[0.875rem] font-medium">
          Settled transactions
        </span>
        <span className="text-[0.75rem] font-medium text-[#8798AD]">
          Showing your transactions in the past hour
        </span>
      </div>
      <div className="h-[400px] w-full max-sm:w-[70%]">
        <PaymentChart />
      </div>
    </div>
  );
};

export default PaymentOverview;
