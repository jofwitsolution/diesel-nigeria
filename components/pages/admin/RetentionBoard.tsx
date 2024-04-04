import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const RetentionBoard = () => {
  return (
    <Card className="w-full bg-light-900 p-2 pt-4">
      <CardContent className="">
        <span className="mb-2 inline-block font-medium">User Retension</span>
        <div className="flex w-full flex-wrap">
          <div className="flex h-[9.375rem] flex-1 flex-col gap-5 rounded-l-lg border bg-primary-500 p-4 text-light-900">
            <span className="font-medium">Users</span>
            <span className="font-fraunces md:text-[1.5rem]">0</span>
          </div>
          <div className="flex h-[9.375rem] flex-1 flex-col gap-5 border p-4">
            <span className="font-medium">Buyers</span>
            <span className="font-fraunces md:text-[1.5rem]">0</span>
          </div>
          <div className="flex h-[9.375rem] flex-1 flex-col gap-5 border  p-4">
            <span className="font-medium">Sellers</span>
            <span className="font-fraunces md:text-[1.5rem]">0</span>
          </div>
          <div className="flex h-[9.375rem] flex-1 flex-col gap-5 rounded-r-lg border p-4">
            <span className="font-medium">User Retension</span>
            <span className="font-fraunces md:text-[1.5rem]">0</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RetentionBoard;
