import React from "react";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";

const sellers = [
  {
    id: "01",
    businessName: "Honeywell Petroleum",
    address: "12 Yusuf Crescent, Lagos",
    phoneNumber: "09087675423",
    email: "honey@gmail.com",
    state: "Lagos",
    price: 940,
    avatar: "/images/icons/honeywell.svg",
  },
  {
    id: "02",
    businessName: "Honeywell Petroleum",
    address: "12 Yusuf Crescent, Lagos",
    phoneNumber: "09087675423",
    email: "honey@gmail.com",
    state: "Lagos",
    price: 940,
    avatar: "/images/icons/honeywell.svg",
  },
  {
    id: "03",
    businessName: "Honeywell Petroleum",
    address: "12 Yusuf Crescent, Lagos",
    phoneNumber: "09087675423",
    email: "honey@gmail.com",
    state: "Lagos",
    price: 940,
    avatar: "/images/icons/honeywell.svg",
  },
  {
    id: "03",
    businessName: "Honeywell Petroleum",
    address: "12 Yusuf Crescent, Lagos",
    phoneNumber: "09087675423",
    email: "honey@gmail.com",
    state: "Lagos",
    price: 940,
    avatar: "/images/icons/honeywell.svg",
  },
  {
    id: "03",
    businessName: "Honeywell Petroleum",
    address: "12 Yusuf Crescent, Lagos",
    phoneNumber: "09087675423",
    email: "honey@gmail.com",
    state: "Lagos",
    price: 940,
    avatar: "/images/icons/honeywell.svg",
  },
  {
    id: "03",
    businessName: "Honeywell Petroleum",
    address: "12 Yusuf Crescent, Lagos",
    phoneNumber: "09087675423",
    email: "honey@gmail.com",
    state: "Lagos",
    price: 940,
    avatar: "/images/icons/honeywell.svg",
  },
  {
    id: "03",
    businessName: "Honeywell Petroleum",
    address: "12 Yusuf Crescent, Lagos",
    phoneNumber: "09087675423",
    email: "honey@gmail.com",
    state: "Lagos",
    price: 940,
    avatar: "/images/icons/honeywell.svg",
  },
  {
    id: "03",
    businessName: "Honeywell Petroleum",
    address: "12 Yusuf Crescent, Lagos",
    phoneNumber: "09087675423",
    email: "honey@gmail.com",
    state: "Lagos",
    price: 940,
    avatar: "/images/icons/honeywell.svg",
  },
  {
    id: "03",
    businessName: "Honeywell Petroleum",
    address: "12 Yusuf Crescent, Lagos",
    phoneNumber: "09087675423",
    email: "honey@gmail.com",
    state: "Lagos",
    price: 940,
    avatar: "/images/icons/honeywell.svg",
  },
  {
    id: "03",
    businessName: "Honeywell Petroleum",
    address: "12 Yusuf Crescent, Lagos",
    phoneNumber: "09087675423",
    email: "honey@gmail.com",
    state: "Lagos",
    price: 940,
    avatar: "/images/icons/honeywell.svg",
  },
];

const AdminSellersTable = () => {
  return (
    <div className="w-full rounded-md bg-light-900 py-4">
      <div className="mb-4 flex w-full items-center justify-between px-3">
        <span className="font-semibold">Sellers</span>
      </div>
      <div className="w-full">
        <table className="w-full text-[0.55rem] text-[#5F6D7E] xs:text-[0.8125rem]">
          <thead className="font-medium">
            <tr className="border-y">
              <th className="py-3 ps-3 text-start">Company</th>
              <th className="py-3 text-start max-sm:hidden">Address</th>
              <th className="py-3 text-start">Phone Number</th>
              <th className="py-3 text-start max-sm:hidden">Email</th>
              <th className="py-3 text-start">AGO Price</th>
              <th className="py-3 text-start"></th>
            </tr>
          </thead>
          <tbody>
            {sellers.map((seller) => (
              <tr
                key={seller.id}
                className="border-b text-start text-[0.5rem] xs:text-[0.75rem]"
              >
                <td className="flex items-center justify-start gap-[0.675rem] py-3 ps-3">
                  <Image
                    src={seller.avatar}
                    width={27}
                    height={27}
                    alt={seller.businessName}
                    className="max-sm:hidden"
                  />
                  <span className="font-medium">{seller.businessName}</span>
                </td>
                <td className="max-sm:hidden">
                  <span className="line-clamp-1">{seller.address}</span>
                </td>
                <td className="">{seller.phoneNumber}</td>
                <td className="max-sm:hidden">{seller.email}</td>
                <td className="">{formatPrice(seller.price)}</td>
                <td className="">
                  <Image
                    src="/images/icons/menu-dot.svg"
                    width={24}
                    height={24}
                    alt="menu"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminSellersTable;
