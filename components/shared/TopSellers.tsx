import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const sellers = [
  {
    id: "01",
    businessName: "Honeywell Petroleum",
    state: "Lagos",
    price: 940,
    avatar: "/images/icons/honeywell.svg",
  },
  {
    id: "02",
    businessName: "Honeywell Petroleum",
    state: "Lagos",
    price: 940,
    avatar: "/images/icons/honeywell.svg",
  },
  {
    id: "03",
    businessName: "Honeywell Petroleum",
    state: "Lagos",
    price: 940,
    avatar: "/images/icons/honeywell.svg",
  },
];

const TopSellers = () => {
  return (
    <div className="w-full rounded-md bg-light-900 p-4 sm:ps-[4rem]">
      <div className="mb-6 flex w-full items-center justify-between">
        <span className="text-[0.75rem] font-semibold">Todays Top Sellers</span>
        <Link
          href="#"
          className="flex items-center gap-2 text-[0.6rem] text-blue-400"
        >
          view all
          <Image
            src="/images/icons/open-link.svg"
            width={16}
            height={16}
            alt="open link"
          />
        </Link>
      </div>
      <div className="w-full space-y-4">
        {sellers.map((seller) => (
          <div
            key={seller.id}
            className="flex w-full items-center justify-between gap-8 border-b pb-3 text-[0.75rem]"
          >
            <span className="flex items-center justify-center gap-[0.675rem]">
              <Image
                src={"/images/icons/honeywell.svg"}
                width={27}
                height={27}
                alt="seller"
              />
              <span className="font-medium">{seller.businessName}</span>
            </span>
            <span className="text-[#5F6D7E]">{seller.state}</span>
            <span className="text-[#5F6D7E]">{formatPrice(seller.price)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSellers;
