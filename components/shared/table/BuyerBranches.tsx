"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { Branch } from "@prisma/client";
import Pagination from "./Pagination";
import SearchBox from "../search/SearchBox";
import { fuzzyFilter } from "./helper";
import { useSearchParams } from "next/navigation";
import BranchActionMenu from "../menubar/BranchActionMenu";
import Link from "next/link";

const columnHelper = createColumnHelper<Branch>();

const columns = [
  columnHelper.accessor((row) => row.name, {
    id: "name",
    cell: (info) => info.getValue(),
    header: () => "Name",
  }),
  columnHelper.accessor((row) => row.address, {
    id: "address",
    cell: (info) => info.getValue(),
    header: () => "Address",
  }),
  columnHelper.accessor("state", {
    id: "state",
    header: "State",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("email", {
    id: "email",
    header: "Email",
    cell: (info) => (
      <span className="max-xs:text-[0.4rem]">{info.getValue()}</span>
    ),
  }),
  columnHelper.accessor("phoneNumber", {
    id: "phoneNumber",
    header: "Phone Number",
    cell: (info) => (
      <span className="max-xs:text-[0.4rem]">{info.getValue()}</span>
    ),
  }),
  columnHelper.accessor("id", {
    id: "action",
    cell: (info) => {
      const branch = info.row.original;

      return <BranchActionMenu branch={branch} />;
    },
    header: () => <span className="invisible">Action</span>,
  }),
];

const BuyerBranches = ({ branches }: { branches: Branch[] }) => {
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("keyword");
  const [globalFilter, setGlobalFilter] = useState<string>("");

  useEffect(() => {
    setGlobalFilter(urlQuery as string);
  }, [urlQuery]);

  const table = useReactTable({
    data: branches,
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
      </div>
      <div className="bg-light-900 pb-4">
        <table className="overflow-hidden">
          <thead>
            <tr className="border-b">
              <th className="dist-table-style text-left">Branches</th>
            </tr>
            {table?.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="border-b text-left max-xs:text-[0.53rem]"
              >
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="dist-table-style">
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
                    <Link href={`/buyer/branches/${row.original.id}/details`}>
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
        {branches?.length > 10 && (
          <div className="my-8 flex justify-center">
            <Pagination table={table} />
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerBranches;
