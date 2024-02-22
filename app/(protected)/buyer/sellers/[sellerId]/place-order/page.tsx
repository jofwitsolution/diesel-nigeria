import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getPlaceOrderData } from "@/lib/actions/buyer.action";
import PlaceOrderForm from "@/components/forms/PlaceOrderForm";
import DBSkeleton from "@/components/DBSkeleton";
import { Button } from "@/components/ui/button";

const Page = async ({ params }: { params: { sellerId: string } }) => {
  const result = await getPlaceOrderData(params.sellerId);

  return (
    <div className="max-w-[69.9375rem] space-y-6">
      {result?.sellerData && (
        <>
          <div className="flex justify-between gap-6">
            <div className="flex items-center gap-2 rounded-md bg-light-900 px-2 py-3">
              <Image
                src={
                  result?.sellerData?.avatar
                    ? result.sellerData.avatar.url
                    : "/images/icons/db-left-avatar.svg"
                }
                width={30}
                height={25}
                alt={"Zec"}
                className="max-xs:hidden"
              />
              {result?.sellerData?.businessName}
            </div>
            <Link href={`/buyer/sellers/${params.sellerId}`}>
              <Button className="flex items-center gap-1 border text-[0.875rem]">
                <Image
                  src="/images/icons/arrow-left.svg"
                  width={24}
                  height={24}
                  alt="arrow-left"
                  className="max-xs:hidden"
                />
                Back
              </Button>
            </Link>
          </div>

          <PlaceOrderForm
            buyerData={result?.buyerData}
            sellerData={result?.sellerData}
          />
        </>
      )}
      {result?.error ? (
        <DBSkeleton message={result?.error} />
      ) : !result?.sellerData ? (
        <DBSkeleton message={"Loading..."} />
      ) : null}
    </div>
  );
};

export default Page;
