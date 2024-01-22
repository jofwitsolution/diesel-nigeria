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

const DistributorTable = () => {
  return (
    <div className="">
      <table className="overflow-hidden rounded-[10px]">
        <thead>
          <tr className="bg-light-900 text-left text-[0.53rem] font-medium text-gray-50 xs:text-[0.8125rem]">
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
              className="border-b bg-light-800 text-[0.6rem] text-gray-50 xs:text-[0.88rem] md:text-[1.125rem]"
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

export default DistributorTable;
