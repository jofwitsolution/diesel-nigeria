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
      <table className="shadow-md">
        <thead>
          <tr className="bg-light-900 text-left text-[0.815rem] font-medium text-gray-50">
            <th className="dist-table-align w-[24.625rem] border-r">Company</th>
            <th className="dist-table-align w-[12.9375rem] border-r">State</th>
            <th className="dist-table-align w-[8.375rem] border-r">
              AGO Price
            </th>
            <th className="dist-table-align w-[8.375rem]"></th>
          </tr>
        </thead>
        <tbody className="">
          {sellers.map((seller, index) => (
            <tr
              key={seller._id + index}
              className="text-[0.88rem] text-light-900"
            >
              <td className="flex items-center gap-4 px-[1rem] py-[0.75rem]">
                <Image
                  src="/images/icons/honeywell.svg"
                  width={31}
                  height={31}
                  alt="icon"
                />{" "}
                Honeywell Petroleum
              </td>
              <td className="px-[1rem] py-[0.75rem]">Lagos</td>
              <td className="px-[1rem] py-[0.75rem]">940.00</td>
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

export default DistributorTable;
