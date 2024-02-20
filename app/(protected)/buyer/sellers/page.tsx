import React from "react";
import SellersInBuyerDB from "@/components/shared/table/SellersInBuyerDB";
import { getVerifiedSellers } from "@/lib/actions/user.action";

const Page = async () => {
  let result = {
    sellers: [],
    error: "",
  };
  result = await getVerifiedSellers();

  return (
    <div className="flex max-w-[73.125rem] gap-6">
      <SellersInBuyerDB sellers={result.sellers} />
    </div>
  );
};

export default Page;
