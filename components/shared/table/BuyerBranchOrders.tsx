"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import Pagination from "./Pagination";
import SearchBox from "../search/SearchBox";
import { fuzzyFilter } from "./helper";
import { buyerOrderColumns } from "./table-columns";
import { Order } from "@prisma/client";
import Link from "next/link";

interface Props {
  orders: Order[];
}

const BuyerBranchOrders = ({ orders }: Props) => {
  const [globalFilter, setGlobalFilter] = useState<string>("");

  const table = useReactTable({
    data: orders,
    columns: buyerOrderColumns,
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
    <>
      {orders.length === 0 ? (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-7">
          <h2 className="text-[1.125rem] font-[600]">No Orders</h2>
        </div>
      ) : (
        <div className="">
          <div className="space-y-4 rounded-lg bg-light-900 py-4">
            <h2 className="px-2 font-medium">Orders</h2>
            <div className="flex w-full items-center justify-between gap-6 px-2">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-[2.375rem] items-center rounded-[5px] bg-gray-200 pl-1`}
                >
                  <div className="flex size-[2.375rem] items-center justify-center rounded-l-[0.5rem]">
                    <Image
                      src="/images/icons/search.svg"
                      width={16.38}
                      height={16.38}
                      alt="search"
                    />
                  </div>
                  <SearchBox
                    initialValue={globalFilter ?? ""}
                    onInputChange={(value) => setGlobalFilter(String(value))}
                    type="text"
                    placeholder="Search"
                    className={`no-focus w-full border-none  bg-transparent text-dark-500 shadow-none outline-none placeholder:text-[0.9rem]`}
                  />
                </div>
              </div>
            </div>

            <table className="overflow-hidden">
              <thead>
                {table?.getHeaderGroups().map((headerGroup) => (
                  <tr
                    key={headerGroup.id}
                    className="border-y text-left text-[0.3rem] font-medium xs:text-[0.8125rem]"
                  >
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="dist-table-style w-[24.625rem]"
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
                    className="border-b bg-light-900 text-[0.3rem] text-black max-xs:font-medium xs:text-[0.8125rem] xs:text-gray-50"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="dist-table-style">
                        <Link href={`/buyer/orders/${row.original.id}`}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </Link>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {orders?.length > 10 && (
              <div className="my-8 flex justify-center">
                <Pagination table={table} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default BuyerBranchOrders;
