"use client";

import { useState } from "react";
import Image from "next/image";
import html2canvas from "html2canvas";
import { Transaction } from "@prisma/client";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Button } from "@/components/ui/button";
import { formatDate, formatPrice, getTimeOfDay } from "@/lib/utils";
import { saveAs } from "file-saver";

const TransactionActionMenu = ({
  transaction,
}: {
  transaction: Transaction;
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDownload = () => {
    const input = document.getElementById("pdf-content");

    html2canvas(input, { scale: 1.3 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      // Convert Base64 string to Blob
      const byteCharacters = atob(imgData.split(",")[1]);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "image/png" });

      // Trigger download
      saveAs(blob, `${transaction.reference}-reciept.png`);
    });
  };

  return (
    <div className="">
      <Menubar className="border-none">
        <MenubarMenu>
          <MenubarTrigger className="">
            <Image
              src="/images/icons/menu-dot.svg"
              width={24}
              height={24}
              alt="menu"
              className="cursor-pointer"
            />
          </MenubarTrigger>
          <MenubarContent className="bg-light-900">
            <MenubarItem
              onClick={() => setIsDialogOpen(true)}
              className="flex cursor-pointer items-center gap-5"
            >
              <Image
                src="/images/icons/eye.svg"
                width={15}
                height={10}
                alt="delete"
                className=""
              />{" "}
              <span>View Details</span>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      {isDialogOpen && (
        <div className="fixed inset-0 z-[1300] flex h-screen items-center justify-center bg-[rgba(0,0,0,0.6)]">
          <div
            className={`z-[1500] mx-auto rounded-[8px] bg-white p-0 pb-8 max-sm:w-[18.75rem] sm:w-[24.375rem]`}
          >
            <div id="pdf-content" className="mx-auto w-full pb-6">
              <div className="m-0 rounded-t-[8px] bg-primary-100 p-2 text-black md:p-3">
                <div className="flex w-full justify-between text-[0.88rem] font-medium">
                  <span>Diesel NG</span>
                  <Button
                    onClick={() => setIsDialogOpen(false)}
                    type="button"
                    className="size-max p-0"
                  >
                    <Image
                      src="/images/icons/cancel.svg"
                      width={14}
                      height={14}
                      alt="cancel"
                    />
                  </Button>
                </div>
                <div>
                  <span className="text-[0.6rem]">Payment Details</span>
                </div>
                <div className="mt-6 flex flex-col items-center">
                  <span className="text-[0.75rem] font-medium">Amount:</span>
                  <span className="font-fraunces text-[1.25rem] text-primary-500 md:text-[1.5rem]">
                    {formatPrice(Number(transaction.amount))}
                  </span>
                </div>
              </div>
              <div className="mt-6 space-y-5 px-3 text-[0.75rem] md:px-6">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Date</span>
                  <span className="font-semibold text-black">
                    {formatDate(transaction.date)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Time</span>
                  <span className="font-semibold text-black">
                    {getTimeOfDay(Number(transaction.date))}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Reference</span>
                  <span className="font-semibold text-black">
                    {transaction.reference}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Order Number</span>
                  <span className="font-semibold text-black">
                    {transaction.orderNumber}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Name</span>
                  <span className="font-semibold text-black">
                    {transaction?.user?.businessName}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Channel</span>
                  <span className="font-semibold text-black">
                    {transaction.channel}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Category</span>
                  <span className="font-semibold text-black">
                    {transaction.category}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <Button
                onClick={handleDownload}
                className="bg-primary-500 text-light-900 active:bg-primary-400"
              >
                Download
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionActionMenu;
