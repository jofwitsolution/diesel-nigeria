"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import html2canvas from "html2canvas";
import { formatDate, formatPrice, getTimeOfDay } from "@/lib/utils";
import { Order } from "@prisma/client";
import { statusBg } from "@/styles/utils";
import { saveAs } from "file-saver";

const OrderDetailsDownloadIMG = ({ order }: { order: Order }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleDownload = () => {
    const input = document.getElementById("pdf-content");
    // Specify the id of the element you want to convert to Image
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
      saveAs(blob, `order_${order.orderNumber}_details.png`);
    });
  };

  return (
    <div>
      <Button
        onClick={() => setDialogOpen(true)}
        className="bg-primary-500 text-white"
      >
        Download
      </Button>

      {/* Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 z-[1300] flex h-screen items-center justify-center overflow-auto bg-[rgba(0,0,0,0.6)]">
          <div
            className={`z-[1500] mx-auto bg-white p-0 pb-8 max-sm:size-full sm:w-[30.375rem]`}
          >
            <div className="float-right px-2 py-1">
              <Button
                onClick={() => setDialogOpen(false)}
                type="button"
                className="size-max p-0"
              >
                <Image
                  src="/images/icons/cancel.svg"
                  width={18}
                  height={18}
                  alt="cancel"
                />
              </Button>
            </div>

            <div
              id="pdf-content"
              className="w-full"
              style={{ width: "100%", padding: "0 10px 0 10px" }}
            >
              <div className="px-2 py-[2.3rem] text-[0.75rem]">
                <div className="flex items-center justify-between">
                  <Image
                    src="/images/icons/site-logo.svg"
                    width={68}
                    height={50}
                    alt="logo"
                  />
                  <h1 className="font-fraunces text-[0.875rem]">
                    Order Details
                  </h1>
                </div>
                <div className="my-3 flex flex-col items-center gap-2">
                  <span className="text-[0.85rem] font-semibold">
                    Order Amount
                  </span>
                  <span className="text-[1rem] font-bold">
                    {formatPrice(order?.amount)}
                  </span>
                </div>
                <div className="flex justify-between gap-6 border-b py-1">
                  <span>Seller Details</span>
                  <div className="flex flex-col text-right">
                    <span className="font-semibold">
                      {order?.seller?.businessName}
                    </span>
                    <span className="text-[0.55rem]">
                      RC Number: {order?.seller?.rcNumber}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between gap-6 border-b py-1">
                  <span>Buyer Details</span>
                  <div className="flex flex-col text-right">
                    <span className="font-semibold">
                      {order?.buyer?.businessName}
                    </span>
                    <span
                      className={`text-[0.55rem] ${order?.buyer?.rcNumber ? "visible" : "invisible"}`}
                    >
                      RC Number: {order?.buyer?.rcNumber}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between gap-6 border-b py-1">
                  <span>Order Number</span>
                  <div className="flex flex-col text-right">
                    <span className="font-semibold">{order?.orderNumber}</span>
                  </div>
                </div>
                <div className="flex justify-between gap-6 border-b py-1">
                  <span>Created On</span>
                  <div className="flex flex-col text-right">
                    <span className="font-semibold">
                      {formatDate(order.orderDate!)}
                    </span>
                    <span className={`text-[0.55rem]`}>
                      {getTimeOfDay(order.orderDate!)}
                    </span>
                  </div>
                </div>
                {order.isBuyerPaid && (
                  <div className="flex justify-between gap-6 border-b py-1">
                    <span>Paid On</span>
                    <div className="flex flex-col text-right">
                      <span className="font-semibold">
                        {formatDate(order.paidOn!)}
                      </span>
                      <span className={`text-[0.55rem]`}>
                        {getTimeOfDay(order.paidOn!)}
                      </span>
                    </div>
                  </div>
                )}
                <div className="flex justify-between gap-6 border-b py-1">
                  <span>Expected Delivery Date</span>
                  <div className="flex flex-col text-right">
                    <span className="font-semibold">
                      {formatDate(order.expectedDeliveryDate!)}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between gap-6 border-b py-1">
                  <span>Order Status</span>
                  <div className="flex flex-col text-right">
                    <span
                      className={`${statusBg(order?.status)} rounded p-1 font-semibold capitalize`}
                    >
                      {order?.status}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between gap-6 border-b py-1">
                  <span>Quantity</span>
                  <div className="flex flex-col text-right">
                    <span className="font-semibold">
                      {order?.quantity} Litres
                    </span>
                  </div>
                </div>
                <div className="flex justify-between gap-6 border-b py-1">
                  <span>Price/litre</span>
                  <div className="flex flex-col text-right">
                    <span className="font-semibold">
                      {formatPrice(order?.pricePerLitre)}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between gap-6 border-b py-1">
                  <span>Total Rate</span>
                  <div className="flex flex-col text-right">
                    <span className="font-semibold">
                      {formatPrice(order?.totalRate)}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between gap-6 border-b py-1">
                  <span>Service Charge</span>
                  <div className="flex flex-col text-right">
                    <span className="font-semibold">
                      {formatPrice(order?.serviceCharge)}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between gap-6 border-b py-1">
                  <span>Delivery Charge</span>
                  <div className="flex flex-col text-right">
                    <span className="font-semibold">
                      {formatPrice(order?.deliveryCharge)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full justify-center">
              <Button
                className="ml-1 mt-1 text-[0.75rem] text-red-400 underline"
                onClick={handleDownload}
              >
                Download Image
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetailsDownloadIMG;
