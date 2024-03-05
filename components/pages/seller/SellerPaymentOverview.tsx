import React from "react";
import PaymentChart from "@/components/shared/chart/PaymentChart";
import { getPaymentsChartData } from "@/components/shared/chart/chartData";

interface Props {
  payments: {
    amount: string;
    date: Date;
  }[];
}

const SellerPaymentOverview = ({ payments }: Props) => {
  return (
    <div className="w-full rounded-md bg-light-900 p-4">
      <div className="flex flex-col gap-1">
        <span className="text-[0.875rem] font-medium">Payment Overview</span>
        <span className="text-[0.75rem] font-medium text-[#8798AD]">
          See how your business is performing
        </span>
      </div>
      <div className="h-[400px] w-full max-sm:w-[90%]">
        <PaymentChart chartData={getPaymentsChartData(payments)} />
      </div>
    </div>
  );
};

export default SellerPaymentOverview;
