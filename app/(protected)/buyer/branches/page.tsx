import React from "react";
import BranchTopLayout from "@/components/pages/buyer/BranchTopLayout";
import BuyerBranches from "@/components/shared/table/BuyerBranches";
import { getCurrentUser } from "@/lib/helpers/auth";
import { getUserBranches } from "@/lib/actions/branch.action";

const Page = async () => {
  const currentUser = await getCurrentUser();

  let result;
  if (currentUser) {
    result = await getUserBranches(currentUser.id as string);
  }

  return (
    <div className="max-w-[63.25rem]">
      <BranchTopLayout />
      <BuyerBranches branches={result?.branches ?? []} />
    </div>
  );
};

export default Page;
