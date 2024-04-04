"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import Link from "next/link";
import Pagination from "./Pagination";
import { fuzzyFilter } from "./helper";
import SearchBox from "../search/SearchBox";
import { formatPrice } from "@/lib/utils";
import { User } from "next-auth";

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

const MarketDistributorTable = ({ sellers }) => {
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("keyword");
  const [globalFilter, setGlobalFilter] = useState<string>("");

  useEffect(() => {
    setGlobalFilter(urlQuery as string);
  }, [urlQuery]);

  const table = useReactTable({
    data: sellers,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="mx-auto mt-[2.5rem] flex flex-col items-center gap-[1.5rem] rounded-[1.25rem] md:bg-light-500 md:py-[1.6875rem] lg:w-[62.5rem] lg:px-[4.75rem]">
      <div
        className={`flex h-[3.125rem] w-full max-w-[40.9375rem] items-center rounded-[0.5rem] text-dark-100`}
      >
        <div className="flex size-[3.125rem] items-center justify-center rounded-l-[0.5rem] bg-primary-500">
          <Image
            src="/images/icons/fuel-truck.svg"
            width={24}
            height={24}
            alt="fuel truck"
          />
        </div>
        <SearchBox
          initialValue={globalFilter ?? ""}
          onInputChange={(value) => setGlobalFilter(String(value))}
          type="text"
          placeholder="Search for a distributor, state"
          className={`no-focus size-full border border-none border-light-600 bg-light-900 shadow-none outline-none placeholder:text-[0.9rem]`}
        />
      </div>
      <table className="overflow-hidden rounded-[10px]">
        <thead>
          {table?.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="bg-light-900 text-left text-[0.53rem] font-medium text-gray-50 xs:text-[0.8125rem]"
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
              className="border-b bg-light-800 text-[0.6rem] text-black max-xs:font-medium xs:text-[0.88rem] xs:text-gray-50 md:text-[1.125rem]"
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
      {sellers?.length > 10 && (
        <div className="my-8 flex justify-center">
          <Pagination table={table} />
        </div>
      )}
    </div>
  );
};

export default MarketDistributorTable;
