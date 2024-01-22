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
          <tr className="bg-light-900 text-left text-[0.655rem] font-medium text-gray-50">
            <th className="dist-table-align w-[24.625rem] border-r">Company</th>
            <th className="dist-table-align hidden w-[12.9375rem] border-r xs:table-cell">
              State
            </th>
            <th className="dist-table-align w-[8.375rem] border-r">
              AGO Price
            </th>
            <th className="dist-table-align w-[8.375rem]"></th>
          </tr>
        </thead>
        <tbody className="bg-light-gradient">
          {sellers.map((seller, index) => (
            <tr
              key={seller._id + index}
              className="text-[0.88rem] text-light-900"
            >
              <td className="line-clamp-1 flex items-center gap-4 px-[1rem] py-[0.75rem]">
                <Image
                  src="/images/icons/honeywell.svg"
                  width={31}
                  height={31}
                  alt="icon"
                  sizes="(max-width: 600px) 18px"
                  className="w-[20px] xs:w-[initial]"
                />{" "}
                <span className="line-clamp-1">{seller.company}</span>
              </td>
              <td className="hidden px-[1rem] py-[0.75rem] xs:table-cell">
                Lagos
              </td>
              <td className="px-[1rem] py-[0.75rem]">{formatPrice(940.0)}</td>
              <td className="px-[1rem] py-[0.75rem]">
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
