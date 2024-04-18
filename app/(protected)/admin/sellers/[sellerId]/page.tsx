import Image from "next/image";
import React from "react";
import DBSkeleton from "@/components/DBSkeleton";
import { getOrders, getUser } from "@/lib/actions/user.action";
import AccountStatusBadge from "@/components/shared/badge/AccountStatusBadge";
import SellerPageTabs from "@/components/pages/admin/SellerPageTabs";
import { adminGetSellerOverview } from "@/lib/actions/admin.action";

const Page = async ({ params }: { params: { sellerId: string } }) => {
  const sellerResult = await getUser(params.sellerId);
  const overviewResult = await adminGetSellerOverview(params.sellerId);
  const orderResult = await getOrders(params.sellerId);

  return (
    <div className="max-w-[68.0625rem]">
      {sellerResult?.user && (
        <div className="w-full rounded-md bg-light-900 px-2 py-3 text-[0.875rem] md:p-6 lg:px-10">
          <div className="mb-8 flex flex-col justify-between border-b-2 pb-3 sm:flex-row">
            <div className="flex items-center gap-2 font-medium text-[#5F6D7E] max-md:text-[0.875rem]">
              <Image
                src={
                  sellerResult.user?.avatar
                    ? sellerResult.user.avatar.url
                    : "/images/icons/db-left-avatar.svg"
                }
                width={100}
                height={75}
                alt={"logo"}
                className=""
              />
              <div className="flex flex-col gap-2">
                <span className="font-medium md:text-[1.125rem] md:leading-[1rem]">
                  {sellerResult?.user?.businessName}
                </span>
                <AccountStatusBadge
                  isActive={!sellerResult?.user.isSuspended}
                />
              </div>
            </div>

            <div className="flex flex-col justify-between gap-2 xs:flex-row xs:gap-12">
              <div className="flex flex-col gap-2">
                <span className="font-[600]">Location:</span>
                <span>{sellerResult?.user?.address}</span>
                <span className="font-[600]">Email Address:</span>
                <span>{sellerResult?.user?.email}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-[600]">Phone Number:</span>
                <span>{sellerResult?.user?.phoneNumber}</span>
              </div>
            </div>
          </div>

          <SellerPageTabs
            seller={sellerResult.user}
            orders={orderResult.orders ?? []}
            overviewData={{
              priceAlert: overviewResult?.priceAlert ?? 0,
              totalProducts: overviewResult?.totalProducts ?? 0,
              totalOrders: overviewResult?.totalOrders ?? 0,
              totalLitres: overviewResult?.totalLitres ?? 0,
              transactionsAmount: overviewResult?.transactionsAmount ?? 0,
              totalTransactions: overviewResult?.totalTransactions ?? 0,
              completedOrders: overviewResult?.completedOrders ?? 0,
              pendingOrders: overviewResult?.pendingOrders ?? 0,
            }}
          />
        </div>
      )}
      {sellerResult?.error ? (
        <DBSkeleton message={sellerResult?.error} />
      ) : !sellerResult?.user ? (
        <DBSkeleton message={"Loading..."} />
      ) : null}
    </div>
  );
};

export default Page;
