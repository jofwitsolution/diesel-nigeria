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

const HomeDistributorTable = () => {
  return (
    <div className="">
      <table className="overflow-hidden rounded-[10px]">
        <thead className="">
          <tr className="bg-light-900 text-left text-[0.53rem] font-medium text-gray-50 xs:text-[0.655rem]">
            <th className="dist-table-style w-[24.625rem] border-r">Company</th>
            <th className="dist-table-style w-[12.9375rem] border-r">State</th>
            <th className="dist-table-style w-[8.375rem] border-r">
              AGO Price
            </th>
            <th className="dist-table-style w-[8.375rem]"></th>
          </tr>
        </thead>
        <tbody className="bg-light-gradient">
          {sellers.map((seller, index) => (
            <tr
              key={seller._id + index}
              className="text-[0.6rem] text-light-900 max-sm:border-b max-sm:bg-light-800 max-sm:text-gray-50 xs:text-[0.88rem]"
            >
              <td className="dist-table-style line-clamp-1 flex items-center gap-2 xs:gap-4">
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
    </div>
  );
};

export default HomeDistributorTable;
