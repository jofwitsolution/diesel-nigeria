import React from "react";
import { getOrders } from "@/lib/actions/user.action";
import { getCurrentUser } from "@/lib/helpers/auth";
import BuyerOrders from "@/components/shared/table/BuyerOrders";

const Page = async () => {
  const currentUser = await getCurrentUser();
  const result = await getOrders(currentUser?.id as string);

  console.log(result.orders);
  return (
    <div className="flex max-w-[73.125rem] gap-6">
      <BuyerOrders orders={result.orders ?? []} />
    </div>
  );
};

export default Page;
