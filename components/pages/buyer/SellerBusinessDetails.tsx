import React from "react";
import { User } from "@prisma/client";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  seller: User;
}

const SellerBusinessDetails = ({ seller }: Props) => {
  return (
    <div className="mt-6 w-full space-y-6 md:mt-10">
      <div className="max-w-[24.9375rem]">
        <p>{seller.businessDescription}</p>
      </div>
      <div className="flex flex-col gap-4">
        <span className="font-[600]">Farm Locations:</span>
        <div className="flex flex-col gap-3 text-[0.875rem]">
          <div className="flex items-center gap-3">
            <Image
              src="/images/icons/location.svg"
              width={12}
              height={17}
              alt="location"
            />
            <span className="text-[#5F6D7E]">{seller.address}</span>
          </div>
        </div>
      </div>
      <div className="mb-3 w-full space-y-4 border-b-2 pb-12">
        <span className="font-[600]">Available Density</span>
        <div className="w-full max-w-[42.8125rem] space-y-3">
          {seller?.products?.map((product) => (
            <div
              key={product?.id}
              className="flex w-full items-center justify-between gap-3 rounded-md border bg-light-900 p-2 text-[0.75rem]"
            >
              <div>
                <span className="font-medium">
                  Diesel (Density {product?.density}g/ml)
                </span>
              </div>
              <div className="flex items-center gap-2 md:gap-4">
                <span className="font-semibold">
                  {formatPrice(Number(product?.price))}
                </span>
                <div className="flex w-[6.4rem] items-center justify-center gap-2 rounded-[3rem] bg-[#F8F9FC]">
                  <div
                    className={`size-3 shrink-0 rounded-full ${product?.isAvailable ? "bg-primary-500" : "bg-red-500"}`}
                  ></div>
                  <span className="font-[600]">
                    {product?.isAvailable ? "Available" : "Unavailable"}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {seller?.products?.length === 0 && (
            <div>
              <span className="font-[600] text-red-400">
                No Available Diesel
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="mb-3 flex w-full justify-center">
        {seller?.products?.length !== 0 && (
          <Link href={`/buyer/sellers/${seller?.id}/place-order`}>
            <Button className="h-[2rem] border bg-primary-500 font-[700] text-light-900 active:bg-primary-100 md:h-[2.2rem]">
              Place your order
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default SellerBusinessDetails;
