import Image from "next/image";
import { createColumnHelper } from "@tanstack/react-table";
import { formatDate, formatPrice, getTimeOfDay } from "@/lib/utils";
import { Order, Transaction, WithdrawalRequest } from "@prisma/client";
import { statusBg } from "@/styles/utils";

const orderColumnHelper = createColumnHelper<Order>();
const transactionColumnHelper = createColumnHelper<Transaction>();
const withdrawalColumnHelper = createColumnHelper<WithdrawalRequest>();

export const buyerOrderColumns = [
  orderColumnHelper.accessor((row) => row.seller, {
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
          />
          <span className="">{seller.businessName}</span>
        </div>
      );
    },
    header: () => "Supplier Name",
  }),
  orderColumnHelper.accessor("quantity", {
    id: "quantity",
    header: "Litre",
    cell: (info) => `${info.getValue()} Litres`,
  }),
  orderColumnHelper.accessor("orderDate", {
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
  orderColumnHelper.accessor("expectedDeliveryDate", {
    id: "expectedDeliveryDate",
    header: () => (
      <span className="flex flex-col">
        <span>Expected</span>
        <span className="">Delivery Date</span>
      </span>
    ),
    cell: (info) => formatDate(info.getValue()),
  }),
  orderColumnHelper.accessor("amount", {
    id: "amount",
    header: "Amount",
    cell: (info) => formatPrice(Number(info.getValue())),
  }),
  orderColumnHelper.accessor("orderNumber", {
    id: "orderNumber",
    header: "Order Number",
    cell: (info) => info.getValue(),
  }),
  orderColumnHelper.accessor("status", {
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
  orderColumnHelper.accessor((row) => row.buyer, {
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
  orderColumnHelper.accessor("quantity", {
    id: "quantity",
    header: "Litre",
    cell: (info) => `${info.getValue()} Litres`,
  }),
  orderColumnHelper.accessor("orderDate", {
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
  orderColumnHelper.accessor("expectedDeliveryDate", {
    id: "expectedDeliveryDate",
    header: () => (
      <span className="flex flex-col">
        <span>Expected</span>
        <span className="">Delivery Date</span>
      </span>
    ),
    cell: (info) => formatDate(info.getValue()),
  }),
  orderColumnHelper.accessor("amount", {
    id: "amount",
    header: "Amount",
    cell: (info) => formatPrice(Number(info.getValue())),
  }),
  orderColumnHelper.accessor("orderNumber", {
    id: "orderNumber",
    header: "Order Number",
    cell: (info) => info.getValue(),
  }),
  orderColumnHelper.accessor("status", {
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

export const adminOrderColumns = [
  orderColumnHelper.accessor((row) => row.buyer, {
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
  orderColumnHelper.accessor("quantity", {
    id: "quantity",
    header: "Litre",
    cell: (info) => `${info.getValue()} Litres`,
  }),
  orderColumnHelper.accessor("orderDate", {
    id: "dateTime",
    cell: (info) => formatDate(info.getValue()),
    header: "Date",
  }),
  orderColumnHelper.accessor("expectedDeliveryDate", {
    id: "expectedDeliveryDate",
    header: () => (
      <span className="flex flex-col">
        <span className="">Delivery Date</span>
      </span>
    ),
    cell: (info) => formatDate(info.getValue()),
  }),
  orderColumnHelper.accessor("amount", {
    id: "amount",
    header: "Amount",
    cell: (info) => formatPrice(Number(info.getValue())),
  }),
  orderColumnHelper.accessor("orderNumber", {
    id: "orderNumber",
    header: "Order Number",
    cell: (info) => info.getValue(),
  }),
  orderColumnHelper.accessor("status", {
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

export const sellerTransactionColumns = [
  transactionColumnHelper.accessor("date", {
    id: "dateTime",
    cell: (info) => {
      const date = formatDate(info.getValue());
      const time = getTimeOfDay(info.getValue());

      return (
        <span className="flex flex-col">
          <span className="font-medium">{date}</span>
          <span className="">{time}</span>
        </span>
      );
    },
    header: "Date, time",
  }),
  transactionColumnHelper.accessor("reference", {
    id: "reference",
    header: "Reference",
    cell: (info) => info.getValue(),
  }),
  transactionColumnHelper.accessor("orderNumber", {
    id: "orderNumber",
    header: "Order Number",
    cell: (info) => info.getValue(),
  }),
  transactionColumnHelper.accessor("amount", {
    id: "amount",
    header: "Amount",
    cell: (info) => formatPrice(Number(info.getValue())),
  }),
  transactionColumnHelper.accessor("channel", {
    id: "channel",
    header: "Channel",
    cell: (info) => info.getValue(),
  }),
];

export const sellerWithdrawalColumns = [
  withdrawalColumnHelper.accessor("date", {
    id: "dateTime",
    cell: (info) => {
      const date = formatDate(info.getValue());
      const time = getTimeOfDay(info.getValue());

      return (
        <span className="flex flex-col">
          <span className="font-medium">{date}</span>
          <span className="">{time}</span>
        </span>
      );
    },
    header: "Date, time",
  }),
  withdrawalColumnHelper.accessor("reference", {
    id: "reference",
    header: "Reference",
    cell: (info) => info.getValue(),
  }),
  withdrawalColumnHelper.accessor("amount", {
    id: "amount",
    header: "Amount",
    cell: (info) => formatPrice(Number(info.getValue())),
  }),
  withdrawalColumnHelper.accessor("bank", {
    id: "destination",
    header: "Destination",
    cell: (info) => (
      <span className="flex flex-col gap-1">
        <span className="capitalize">{info.row.original.bank}</span>
        <span>{info.row.original.accountNumber}</span>
      </span>
    ),
  }),
  withdrawalColumnHelper.accessor("description", {
    id: "description",
    header: "Description",
    cell: (info) => info.getValue(),
  }),
  withdrawalColumnHelper.accessor("status", {
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
