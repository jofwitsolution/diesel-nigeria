"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import Link from "next/link";
import Pagination from "./Pagination";
import SearchBox from "../search/SearchBox";
import { fuzzyFilter } from "./helper";
import { sellerOrderColumns } from "./table-columns";
import { Order } from "@prisma/client";
import { orderFilters } from "@/constants";

interface Props {
  orders: Order[];
}

const SellerOrders = ({ orders }: Props) => {
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [currentFilter, setCurrentFilter] = useState<string>("");

  useEffect(() => {
    setGlobalFilter(currentFilter);
  }, [currentFilter]);

  const table = useReactTable({
    data: orders,
    columns: sellerOrderColumns,
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
          <h2 className="text-[1.125rem] font-[600]">Your Order is empty</h2>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex w-full items-center justify-between gap-6">
            <div
              className={`flex h-[2.375rem] items-center rounded-[5px] bg-light-900 pl-1`}
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
                placeholder="Search branches"
                className={`no-focus w-full border-none  bg-transparent text-dark-500 shadow-none outline-none placeholder:text-[0.9rem]`}
              />
            </div>
            <Button className="flex items-center gap-1 bg-light-900 text-gray-500">
              <Image
                src="/images/icons/refresh.svg"
                width={20}
                height={20}
                alt="refresh"
              />
              <span>Refresh</span>
            </Button>
          </div>
          <div className="flex flex-wrap">
            {orderFilters.map((item) => (
              <Button
                key={item.label}
                onClick={() => setCurrentFilter(item.value)}
                className={`${currentFilter === item.value ? "bg-primary-500 text-light-900" : "text-dark-100"} w-[10rem]`}
              >
                {item.label}
              </Button>
            ))}
          </div>
          <div className="bg-light-900 pb-4">
            <table className="overflow-hidden">
              <thead>
                {table?.getHeaderGroups().map((headerGroup) => (
                  <tr
                    key={headerGroup.id}
                    className="text-left text-[0.3rem] font-medium xs:text-[0.8125rem]"
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
                    className="border-b bg-light-900 text-[0.3rem] text-black max-xs:font-medium xs:text-[0.8125rem] xs:text-gray-50"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="dist-table-style">
                        <Link
                          href={`/seller/orders/${row.original.id}`}
                          className="hover:underline"
                        >
                          {" "}
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

export default SellerOrders;
