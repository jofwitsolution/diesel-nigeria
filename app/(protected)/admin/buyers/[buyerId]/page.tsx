import Image from "next/image";
import React from "react";
import DBSkeleton from "@/components/DBSkeleton";
import { getOrders, getUser } from "@/lib/actions/user.action";
import AccountStatusBadge from "@/components/shared/badge/AccountStatusBadge";
import BuyerPageTabs from "@/components/pages/admin/BuyerPageTabs";
import { adminGetBuyerOverview } from "@/lib/actions/admin.action";

const Page = async ({ params }: { params: { buyerId: string } }) => {
  const buyerResult = await getUser(params.buyerId);
  const overviewResult = await adminGetBuyerOverview(params.buyerId);
  const orderResult = await getOrders(params.buyerId);

  return (
    <div className="max-w-[68.0625rem]">
      {buyerResult?.user && (
        <div className="w-full rounded-md bg-light-900 px-2 py-3 text-[0.875rem] md:p-6 lg:px-10">
          <div className="mb-8 flex flex-col justify-between border-b-2 pb-3 sm:flex-row">
            <div className="flex items-center gap-2 font-medium text-[#5F6D7E] max-md:text-[0.875rem]">
              <Image
                src={
                  buyerResult.user?.avatar
                    ? buyerResult.user.avatar.url
                    : "/images/icons/db-left-avatar.svg"
                }
                width={100}
                height={75}
                alt={"logo"}
                className=""
              />
              <div className="flex flex-col gap-2">
                <span className="font-medium md:text-[1.125rem] md:leading-[1rem]">
                  {buyerResult?.user?.businessName}
                </span>
                <AccountStatusBadge isActive={!buyerResult?.user.isSuspended} />
              </div>
            </div>

            <div className="flex flex-col justify-between gap-2 xs:flex-row xs:gap-12">
              <div className="flex flex-col gap-2">
                <span className="font-[600]">Location:</span>
                <span>{buyerResult?.user?.address}</span>
                <span className="font-[600]">Email Address:</span>
                <span>{buyerResult?.user?.email}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-[600]">Phone Number:</span>
                <span>{buyerResult?.user?.phoneNumber}</span>
              </div>
            </div>
          </div>

          <BuyerPageTabs
            buyer={buyerResult.user}
            orders={orderResult.orders ?? []}
            overviewData={{
              totalBranches: overviewResult?.totalBranches ?? 0,
              totalOrders: overviewResult?.totalOrders ?? 0,
              transactionsAmount: overviewResult?.transactionsAmount ?? 0,
              totalTransactions: overviewResult?.totalTransactions ?? 0,
              completedOrders: overviewResult?.completedOrders ?? 0,
              pendingOrders: overviewResult?.pendingOrders ?? 0,
            }}
          />
        </div>
      )}
      {buyerResult?.error ? (
        <DBSkeleton message={buyerResult?.error} />
      ) : !buyerResult?.user ? (
        <DBSkeleton message={"Loading..."} />
      ) : null}
    </div>
  );
};

export default Page;
