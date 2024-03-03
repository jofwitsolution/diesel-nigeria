import React from "react";
import { getOrders } from "@/lib/actions/user.action";
import { getCurrentUser } from "@/lib/helpers/auth";
import SellerOrders from "@/components/shared/table/SellerOrders";

const Page = async () => {
  const currentUser = await getCurrentUser();
  const result = await getOrders(currentUser?.id as string);

  return (
    <div className="flex max-w-[73.125rem] gap-6">
      <SellerOrders orders={result.orders ?? []} />
    </div>
  );
};

export default Page;
