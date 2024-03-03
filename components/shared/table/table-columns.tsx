import Image from "next/image";
import { createColumnHelper } from "@tanstack/react-table";
import { formatDate, formatPrice, getTimeOfDay } from "@/lib/utils";
import { Order } from "@prisma/client";
import { statusBg } from "@/styles/utils";

const columnHelper = createColumnHelper<Order>();

export const buyerOrderColumns = [
  columnHelper.accessor((row) => row.seller, {
    id: "supplierName",
    cell: (info) => {
      const seller = info.row.original?.seller;

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
            className="w-[20px] xs:w-[initial]"
          />{" "}
          <span className="">{seller.businessName}</span>
        </div>
      );
    },
    header: () => "Supplier Name",
  }),
  columnHelper.accessor("quantity", {
    id: "quantity",
    header: "Litre",
    cell: (info) => `${info.getValue()} Litres`,
  }),
  columnHelper.accessor("orderDate", {
    id: "dateTime",
    cell: (info) => {
      const date = formatDate(info.getValue());
      const time = getTimeOfDay(info.getValue());

      return (
        <span className="flex flex-col">
          <span>{date}</span>
          <span className="text-primary-500">{time}</span>
        </span>
      );
    },
    header: () => (
      <span className="flex flex-col">
        <span>Order Date</span>
        <span className="">and Time</span>
      </span>
    ),
  }),
  columnHelper.accessor("expectedDeliveryDate", {
    id: "expectedDeliveryDate",
    header: () => (
      <span className="flex flex-col">
        <span>Expected</span>
        <span className="">Delivery Date</span>
      </span>
    ),
    cell: (info) => formatDate(info.getValue()),
  }),
  columnHelper.accessor("amount", {
    id: "amount",
    header: "Amount",
    cell: (info) => formatPrice(Number(info.getValue())),
  }),
  columnHelper.accessor("orderNumber", {
    id: "orderNumber",
    header: "Order Number",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("status", {
    id: "status",
    header: "Status",
    cell: (info) => (
      <span
        className={`${statusBg(info.getValue())} rounded p-1 font-[700] capitalize`}
      >
        {info.getValue()}
      </span>
    ),
  }),
];

export const sellerOrderColumns = [
  columnHelper.accessor((row) => row.buyer, {
    id: "customer",
    cell: (info) => {
      const buyer = info.row.original?.buyer;

      return (
        <div className="flex size-full items-center gap-2 xs:gap-4">
          <Image
            src={
              buyer?.avatar
                ? buyer?.avatar.url
                : "/images/icons/db-left-avatar.svg"
            }
            width={31}
            height={31}
            alt="icon"
            className="w-[20px] xs:w-[initial]"
          />{" "}
          <span className="">{buyer.businessName}</span>
        </div>
      );
    },
    header: () => "Customer",
  }),
  columnHelper.accessor("quantity", {
    id: "quantity",
    header: "Litre",
    cell: (info) => `${info.getValue()} Litres`,
  }),
  columnHelper.accessor("orderDate", {
    id: "dateTime",
    cell: (info) => {
      const date = formatDate(info.getValue());
      const time = getTimeOfDay(info.getValue());

      return (
        <span className="flex flex-col">
          <span>{date}</span>
          <span className="text-primary-500">{time}</span>
        </span>
      );
    },
    header: () => (
      <span className="flex flex-col">
        <span>Order Date</span>
        <span className="">and Time</span>
      </span>
    ),
  }),
  columnHelper.accessor("expectedDeliveryDate", {
    id: "expectedDeliveryDate",
    header: () => (
      <span className="flex flex-col">
        <span>Expected</span>
        <span className="">Delivery Date</span>
      </span>
    ),
    cell: (info) => formatDate(info.getValue()),
  }),
  columnHelper.accessor("amount", {
    id: "amount",
    header: "Amount",
    cell: (info) => formatPrice(Number(info.getValue())),
  }),
  columnHelper.accessor("orderNumber", {
    id: "orderNumber",
    header: "Order Number",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("status", {
    id: "status",
    header: "Status",
    cell: (info) => (
      <span
        className={`${statusBg(info.getValue())} rounded p-1 font-[700] capitalize`}
      >
        {info.getValue()}
      </span>
    ),
  }),
];
