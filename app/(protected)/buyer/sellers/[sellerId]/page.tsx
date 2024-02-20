import ProductDetails from "@/components/pages/buyer/ProductDetails";
import { Button } from "@/components/ui/button";
import { getSellerDetails } from "@/lib/actions/user.action";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = async ({ params }: { params: { sellerId: string } }) => {
  const result = await getSellerDetails(params.sellerId);

  return (
    <div className="max-w-[68.0625rem] space-y-6">
      <div className="flex justify-between gap-6">
        <div className="flex items-center gap-2 rounded-md bg-light-900 px-2 py-3">
          <Image
            src={
              result?.seller?.avatar
                ? result.seller.avatar.url
                : "/images/icons/db-left-avatar.svg"
            }
            width={30}
            height={25}
            alt={"Zec"}
            className="max-xs:hidden"
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
      <ProductDetails seller={result?.seller} />
    </div>
  );
};

export default Page;
