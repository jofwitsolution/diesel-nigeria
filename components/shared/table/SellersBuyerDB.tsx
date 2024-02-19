import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const sellers = [
  {
    _id: "190TR",
    company: "Honeywell Petroleum",
    state: "Lagos",
    price: 940,
    logoUrl: "/images/icons/honeywell.svg",
  },
  {
    _id: "190TR",
    company: "Honeywell Petroleum",
    state: "Lagos",
    price: 940,
    logoUrl: "/images/icons/honeywell.svg",
  },
  {
    _id: "190TR",
    company: "Honeywell Petroleum",
    state: "Lagos",
    price: 940,
    logoUrl: "/images/icons/honeywell.svg",
  },
  {
    _id: "190TR",
    company: "Honeywell Petroleum",
    state: "Lagos",
    price: 940,
    logoUrl: "/images/icons/honeywell.svg",
  },
  {
    _id: "190TR",
    company: "Honeywell Petroleum",
    state: "Lagos",
    price: 940,
    logoUrl: "/images/icons/honeywell.svg",
  },
  {
    _id: "190TR",
    company: "Honeywell Petroleum",
    state: "Lagos",
    price: 940,
    logoUrl: "/images/icons/honeywell.svg",
  },
  {
    _id: "190TR",
    company: "Honeywell Petroleum",
    state: "Lagos",
    price: 940,
    logoUrl: "/images/icons/honeywell.svg",
  },
  {
    _id: "190TR",
    company: "Honeywell Petroleum",
    state: "Lagos",
    price: 940,
    logoUrl: "/images/icons/honeywell.svg",
  },
  {
    _id: "190TR",
    company: "Honeywell Petroleum",
    state: "Lagos",
    price: 920,
    logoUrl: "/images/icons/honeywell.svg",
  },
  {
    _id: "190TR",
    company: "Honeywell Petroleum",
    state: "Lagos",
    price: 1000,
    logoUrl: "/images/icons/honeywell.svg",
  },
];

const SellersBuyerDB = () => {
  return (
    <div className="space-y-6">
      <div className="flex w-full items-center justify-between gap-6">
        <div
          className={`flex h-[2.5rem] items-center rounded-[0.5rem] bg-light-900 xs:h-[3.125rem] sm:w-[50%]`}
        >
          <div className="flex size-[2.5rem] items-center justify-center rounded-l-[0.5rem] bg-[#808494] xs:size-[3.125rem]">
            <Image
              src="/images/icons/fuel-truck.svg"
              width={24}
              height={24}
              alt="fuel truck"
            />
          </div>
          <Input
            type="text"
            placeholder="Search for a distributor, state"
            className={`no-focus w-full border-none  bg-transparent text-dark-500 shadow-none outline-none placeholder:text-[0.9rem]`}
          />
        </div>
        <Button className="flex items-center bg-light-900 text-gray-500">
          <Image
            src="/images/icons/refresh.svg"
            width={20}
            height={20}
            alt="refresh"
          />
          <span>Refresh</span>
        </Button>
      </div>
      <table className="overflow-hidden">
        <thead>
          <tr className="bg-[#808494] text-left text-[0.53rem] font-medium text-light-900 xs:text-[0.8125rem]">
            <th className="dist-table-style w-[24.625rem] border-r">Company</th>
            <th className="dist-table-style w-[12.9375rem] border-r">State</th>
            <th className="dist-table-style w-[8.375rem] border-r">
              AGO Price
            </th>
            <th className="dist-table-style w-[8.375rem]"></th>
          </tr>
        </thead>
        <tbody className="">
          {sellers.map((seller, index) => (
            <tr
              key={seller._id + index}
              className="border-b bg-light-900 text-[0.6rem] text-black max-xs:font-medium xs:text-[0.88rem] xs:text-gray-50 md:text-[1.125rem]"
            >
              <td className="dist-table-style flex items-center gap-2 font-medium text-gray-700 xs:gap-4">
                <Image
                  src={seller.logoUrl}
                  width={31}
                  height={31}
                  alt="icon"
                  className="w-[20px] xs:w-[initial]"
                />{" "}
                <span className="line-clamp-1">{seller.company}</span>
              </td>
              <td className="dist-table-style">{seller.state}</td>
              <td className="dist-table-style">{formatPrice(seller.price)}</td>
              <td className="dist-table-style">
                <span className="cursor-pointer border-b-[2px] border-primary-500 text-primary-500">
                  Buy
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="my-8 flex justify-center">Pagination</div>
    </div>
  );
};

export default SellersBuyerDB;
