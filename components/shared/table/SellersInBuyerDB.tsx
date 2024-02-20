"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { User } from "@prisma/client";
import Link from "next/link";

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor((row) => row.businessName, {
    id: "businessName",
    cell: (info) => {
      const seller = info.row.original;

      return (
        <div className="flex size-full items-center gap-2 xs:gap-4">
          <Image
            src={
              seller?.avatar
                ? seller?.avatar.url
                : "/images/icons/honeywell.svg"
            }
            width={31}
            height={31}
            alt="icon"
            className="w-[20px] xs:w-[initial]"
          />{" "}
          <span className="line-clamp-1">{seller.businessName}</span>
        </div>
      );
    },
    header: () => "Company",
  }),
  columnHelper.accessor("state", {
    id: "state",
    header: "State",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("products", {
    id: "price",
    cell: (info) => {
      const price = formatPrice(info.getValue()[0].price);

      return price;
    },
    header: () => "AGO Price",
  }),
  // columnHelper.accessor("id", {
  //   id: "buy",
  //   header: "",
  //   cell: (info) => (
  //     <span className="cursor-pointer border-b-[2px] border-primary-500 text-primary-500">
  //       Buy
  //     </span>
  //   ),
  // }),
];

const SellersInBuyerDB = ({ sellers }) => {
  const table = useReactTable({
    data: sellers,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

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
          {table?.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="bg-[#808494] text-left text-[0.53rem] font-medium text-light-900 xs:text-[0.8125rem]"
            >
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="dist-table-style w-[24.625rem] border-r"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="">
          {table?.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="border-b bg-light-900 text-[0.6rem] text-black max-xs:font-medium xs:text-[0.88rem] xs:text-gray-50 md:text-[1.125rem]"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="dist-table-style">
                  <Link
                    href={`/buyers/sellers/${row.original.id}`}
                    className="hover:underline"
                  >
                    {" "}
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Link>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="my-8 flex justify-center">Pagination</div>
    </div>
  );
};

export default SellersInBuyerDB;
