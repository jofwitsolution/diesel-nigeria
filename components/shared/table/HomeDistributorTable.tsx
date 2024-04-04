"use client";

import Image from "next/image";
import Link from "next/link";
import React, { SyntheticEvent } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { User } from "@prisma/client";
import { formatPrice } from "@/lib/utils";
import { fuzzyFilter } from "./helper";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

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
                : "/images/icons/db-left-avatar.svg"
            }
            width={31}
            height={31}
            alt="icon"
            className="w-[25px]"
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
      const price = formatPrice(info.getValue()[0]?.price);

      return price;
    },
    header: () => "AGO Price",
  }),
  columnHelper.accessor("id", {
    id: "sellerId",
    header: "",
    cell: (info) => {
      return (
        <Link
          href={`/buyer/sellers/${info.getValue()}`}
          className="cursor-pointer border-b-[2px] border-primary-500 text-primary-500"
        >
          Buy
        </Link>
      );
    },
  }),
];

const HomeDistributorTable = ({ sellers }) => {
  const router = useRouter();

  const table = useReactTable({
    data: sellers.slice(0, 10),
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    globalFilterFn: fuzzyFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  const handleSearch = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if ((e.target as HTMLFormElement).search.value) {
      router.push(
        `/market?keyword=${(e.target as HTMLFormElement).search.value}`
      );
    }
  };

  return (
    <div className="mx-auto flex max-w-[40.9375rem] flex-col items-center gap-[1.5rem] bg-transparent">
      <form
        onSubmit={handleSearch}
        className={`flex h-[3.125rem] w-full items-center rounded-[0.5rem] max-sm:border max-sm:border-light-600 sm:bg-[rgba(255,255,255,0.20)]`}
      >
        <div className="flex size-[3.125rem] items-center justify-center rounded-l-[0.5rem] bg-primary-500">
          <Image
            src="/images/icons/fuel-truck.svg"
            width={24}
            height={24}
            alt="fuel truck"
          />
        </div>
        <Input
          type="text"
          name="search"
          placeholder="Search for a distributor, state"
          className={`no-focus size-full border-none bg-transparent shadow-none  outline-none placeholder:text-[0.9rem] sm:text-light-900`}
        />
      </form>
      <table className="overflow-hidden rounded-[10px]">
        <thead className="">
          {table?.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="bg-light-900 text-left text-[0.53rem] font-medium text-gray-50 xs:text-[0.655rem]"
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
        <tbody className="bg-light-gradient">
          {table?.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="text-[0.6rem] text-light-900 max-sm:border-b max-sm:bg-light-800 max-sm:font-medium max-sm:text-black xs:text-[0.88rem]"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="dist-table-style">
                  {" "}
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomeDistributorTable;
