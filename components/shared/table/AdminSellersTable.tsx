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
import { User } from "@prisma/client";
import Pagination from "./Pagination";
import { fuzzyFilter } from "./helper";
import Link from "next/link";
import SellersActionMenu from "../menubar/SellersActionMenu";
import ExportAs from "../ExportAs";

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor((row) => row.businessName, {
    id: "company",
    cell: (info) => {
      const seller = info.row.original;

      return (
        <Link
          href={`/admin/sellers/${seller.id}`}
          className="flex size-full items-center gap-2 hover:underline xs:gap-4"
        >
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
        </Link>
      );
    },
    header: () => "Company",
  }),
  columnHelper.accessor("address", {
    id: "address",
    header: "Address",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("phoneNumber", {
    id: "phoneNumber",
    header: "Phone Number",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("email", {
    id: "email",
    header: "Email",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("rcNumber", {
    id: "rcNumber",
    cell: (info) => info.getValue(),
    header: () => "RC Number",
  }),
  columnHelper.accessor((row) => row.isSuspended, {
    id: "status",
    cell: (info) => {
      const isSuspended = info.getValue();

      return (
        <>
          {isSuspended ? (
            <span className="text-red-500">Suspended</span>
          ) : (
            <span className="text-primary-500">Active</span>
          )}
        </>
      );
    },
    header: "Status",
  }),
  columnHelper.accessor("isSuspended", {
    id: "action",
    cell: (info) => {
      const seller = info.row.original;

      return <SellersActionMenu seller={seller} />;
    },
    header: "",
  }),
];

interface Props {
  sellers: User[];
  currentFilter: string;
}

const AdminSellersTable = ({ sellers, currentFilter }: Props) => {
  const [globalFilter, setGlobalFilter] = useState<string>("");

  useEffect(() => {
    setGlobalFilter(currentFilter);
  }, [currentFilter]);

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
    <div className="w-full rounded-md bg-light-900 py-4">
      <div className="mb-4 flex w-full items-center justify-between px-3">
        <span className="font-semibold">Sellers</span>

        <ExportAs
          fileName="dieselng-sellers"
          rows={table.getFilteredRowModel().rows}
        />
      </div>
      <div className="w-full">
        <table className="w-full text-[0.55rem] text-[#5F6D7E] xs:text-[0.8125rem]">
          <thead className="font-medium">
            {table?.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-y">
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="py-3 ps-3 text-start">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table?.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b text-start text-[0.5rem] xs:text-[0.75rem]"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="dist-table-style">
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
    </div>
  );
};

export default AdminSellersTable;
