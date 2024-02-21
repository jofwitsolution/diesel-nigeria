import React from "react";
import { User } from "@prisma/client";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SellerBusinessDetails from "./SellerBusinessDetails";

interface Props {
  seller: User;
}

const SellerDetails = ({ seller }: Props) => {
  return (
    <div className="w-full rounded-md bg-light-900 px-2 py-3 md:p-6 lg:px-10">
      <div className="mb-3 flex flex-col justify-between border-b-2 pb-3 xs:flex-row xs:items-center">
        <div className="flex flex-col gap-2 font-medium text-[#5F6D7E] max-md:text-[0.875rem]">
          <Image
            src={
              seller?.avatar
                ? seller.avatar.url
                : "/images/icons/db-left-avatar.svg"
            }
            width={100}
            height={75}
            alt={"Zec"}
            className="max-xs:hidden"
          />
          <span className="">{seller.businessName}</span>
          <span className="">RC {seller.rcNumber}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Image
              src="/images/icons/distance.svg"
              width={14}
              height={12}
              alt="distance"
            />
            <span>2km way</span>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src="/images/icons/clock-dark.svg"
              width={14}
              height={12}
              alt="time"
            />
            within 30&apos;
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 max-sm:hidden">
          <Image
            src="/images/icons/tag.svg"
            width={24.7}
            height={24.7}
            alt="tag"
          />
          <span className="text-[0.65rem] text-[#808494]">
            Price update alert
          </span>
          <span className="text-[0.9rem] font-medium">
            {formatPrice(seller.products[0]?.price)}/Litre
          </span>
          <span className="text-[0.65rem] text-[#808494]">
            Up from last 48 hours
          </span>
        </div>
      </div>
      <div className="w-full">
        <Tabs defaultValue="business-details" className="w-full">
          <TabsList className="xs:w-full lg:w-[25rem]">
            <TabsTrigger
              value="business-details"
              className="flex-1 border data-[state=active]:bg-primary-500 data-[state=active]:font-[700] data-[state=active]:text-light-900 max-xs:px-2 max-xs:text-[0.7rem]"
            >
              Business Details
            </TabsTrigger>
            <TabsTrigger
              value="purchased"
              className="flex-1 border data-[state=active]:bg-primary-500 data-[state=active]:font-[700] data-[state=active]:text-light-900 max-xs:px-2 max-xs:text-[0.7rem]"
            >
              Purchased
            </TabsTrigger>
          </TabsList>
          <TabsContent value="business-details" className="w-full space-y-6">
            <SellerBusinessDetails seller={seller} />
          </TabsContent>
          <TabsContent
            value="purchased"
            className="w-full space-y-6"
          ></TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SellerDetails;
