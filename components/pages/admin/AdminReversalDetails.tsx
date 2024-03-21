"use client";

import React from "react";
import { Reversal } from "@prisma/client";
import { formatDate, formatPrice, getTimeOfDay } from "@/lib/utils";
import { statusBg } from "@/styles/utils";
import RejectReversal from "./RejectReversal";
import ApproveReversal from "./ApproveReversal";

interface Props {
  reversal: Reversal;
}

const AdminReversalDetails = ({ reversal }: Props) => {
  return (
    <>
      <div className="w-full rounded-md bg-light-900 px-2 py-3 md:p-6 lg:px-10">
        <div className="flex w-full flex-col gap-6">
          <span className="text-center font-[600]">Reversal Details</span>
          <table className="overflow-hidden">
            <thead>
              <tr className="border-b text-left text-[0.3rem] font-medium sm:text-[0.8125rem]">
                <th className="dist-table-style w-[24.625rem]">
                  Request Date & Time
                </th>
                <th className="dist-table-style w-[24.625rem]">Amount</th>
                <th className="dist-table-style w-[24.625rem]">Order Number</th>
                <th className="dist-table-style w-[24.625rem]">Status</th>
              </tr>
            </thead>
            <tbody className="">
              <tr className="border-b bg-light-900 text-[0.3rem] text-black max-xs:font-medium xs:text-gray-50 sm:text-[0.8125rem]">
                <td className="dist-table-style">
                  <span className="flex flex-col">
                    <span>{formatDate(reversal.date)}</span>
                    <span className="text-primary-500">
                      {getTimeOfDay(reversal.date)}
                    </span>
                  </span>
                </td>
                <td className="dist-table-style">
                  {formatPrice(Number(reversal.amount))}
                </td>
                <td className="dist-table-style">{reversal.orderNumber}</td>
                <td className="dist-table-style">
                  <span
                    className={`${statusBg(reversal.status)} rounded p-1 font-[700] capitalize`}
                  >
                    {reversal.status}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex flex-wrap justify-between gap-8">
            <div className="flex max-w-[26rem] flex-col gap-2">
              <span className="font-[600]">Reason for reversal:</span>
              <span className="flex flex-col gap-2 text-[0.875rem]">
                <span className="font-medium text-red-300">
                  {reversal.reason}
                </span>
                <span>{reversal.description}</span>
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-[600]">Bank Info:</span>
              <span className="flex flex-col gap-2 text-[0.875rem]">
                <span>Bank Name: {reversal.bank}</span>
                <span>Account Number: {reversal.accountNumber}</span>
                <span>Account Name: {reversal.accountName}</span>
              </span>
            </div>
          </div>

          {/* Reject or Reverse */}
          <div className="flex flex-wrap gap-3">
            <RejectReversal reversal={reversal} />
            <ApproveReversal reversal={reversal} />
          </div>
          <div className="mb-6 w-full border" />
        </div>
      </div>
    </>
  );
};

export default AdminReversalDetails;
