import React from "react";
// import SellerDetails from "@/components/pages/buyer/SellerDetails";
// import { Button } from "@/components/ui/button";
import { getOrder } from "@/lib/actions/user.action";
// import Image from "next/image";
// import Link from "next/link";
// import DBSkeleton from "@/components/DBSkeleton";

const Page = async ({ params }: { params: { orderId: string } }) => {
  const result = await getOrder(params.orderId);

  console.log(result);

  return (
    <div className="max-w-[68.0625rem] space-y-6">
      {/* {result?.seller && (
        <>
          <div className="flex justify-between gap-6">
            <div className="flex items-center gap-2 rounded-md bg-light-900 px-2 py-3 max-xs:hidden">
              <Image
                src={
                  result?.seller?.avatar
                    ? result.seller.avatar.url
                    : "/images/icons/db-left-avatar.svg"
                }
                width={30}
                height={25}
                alt={"Zec"}
                className=""
              />
              {result?.seller?.businessName}
            </div>
            <Link href="/buyer/sellers">
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

          <SellerDetails seller={result?.seller} />
        </>
      )}
      {result?.error ? (
        <DBSkeleton message={result?.error} />
      ) : !result?.seller ? (
        <DBSkeleton message={"Loading..."} />
      ) : null} */}
    </div>
  );
};

export default Page;
