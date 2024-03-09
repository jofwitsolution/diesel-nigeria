import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { getAdminRevenue } from "@/lib/actions/admin.action";

const RevenueBoard = async () => {
  const result = await getAdminRevenue();

  return (
    <Card className="w-full bg-light-900 p-2 pt-4">
      <CardContent className="">
        <span className="mb-2 inline-block font-medium">Revenue</span>
        <div className="flex w-full flex-wrap">
          <div className="flex h-[9.375rem] flex-1 flex-col gap-5 rounded-l-lg border bg-primary-500 p-4 text-light-900">
            <span className="font-medium">Total</span>
            <span className="font-fraunces md:text-[1.5rem]">
              {formatPrice((result.totalRevenue as number) ?? 0)}
            </span>
          </div>
          <div className="flex h-[9.375rem] flex-1 flex-col gap-5 border p-4">
            <span className="font-medium">Last Month</span>
            <span className="font-fraunces md:text-[1.5rem]">
              {formatPrice((result.monthlyTotalRevenue as number) ?? 0)}
            </span>
          </div>
          <div className="flex h-[9.375rem] flex-1 flex-col gap-5 border  p-4">
            <span className="font-medium">Last Week</span>
            <span className="font-fraunces md:text-[1.5rem]">
              {formatPrice((result.weeklyTotalRevenue as number) ?? 0)}
            </span>
          </div>
          <div className="flex h-[9.375rem] flex-1 flex-col gap-5 rounded-r-lg border p-4">
            <span className="font-medium">Yesterday</span>
            <span className="font-fraunces md:text-[1.5rem]">
              {formatPrice((result.yesterdayTotalRevenue as number) ?? 0)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueBoard;
