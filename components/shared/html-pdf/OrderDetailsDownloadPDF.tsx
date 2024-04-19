"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import JSPDF from "jspdf";
import Image from "next/image";
import html2canvas from "html2canvas";
import { formatDate, formatPrice, getTimeOfDay } from "@/lib/utils";
import { Order } from "@prisma/client";
import { statusBg } from "@/styles/utils";

const OrderDetailsDownloadPDF = ({ order }: { order: Order }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleDownloadPDF = () => {
    const input = document.getElementById("pdf-content");
    // Specify the id of the element you want to convert to PDF
    html2canvas(input, { scale: 1.3 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      const pdf = new JSPDF({
        format: "a4",
        unit: "px",
      });
      pdf.setFont("Inter-Regular", "normal");
      pdf.addImage(imgData, "PNG", 40, 40);
      pdf.save(`$order-reciept.pdf`);
    });
  };

  return (
    <div>
      <Button
        onClick={() => setDialogOpen(true)}
        className="text-[0.75rem] underline"
      >
        Download PDF
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
                  width={14}
                  height={14}
                  alt="cancel"
                />
              </Button>
            </div>
            <Button
              className="ml-1 mt-1 text-[0.75rem] text-red-400 underline"
              onClick={handleDownloadPDF}
            >
              Download
            </Button>
            <div
              id="pdf-content"
              className="w-full"
              style={{ width: "100%", padding: "0 20px 0 20px" }}
            >
              <div className="px-2 py-[1rem] text-[0.75rem]">
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
                  <span className="font-semibold">Order Amount</span>
                  <span className="text-[0.9rem] font-bold">
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
                  <span>Delivery Expected</span>
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
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetailsDownloadPDF;
