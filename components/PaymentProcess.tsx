"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BeatLoader } from "react-spinners";
import { Button } from "./ui/button";

interface Props {
  result: {
    loading: boolean;
    error: string;
    success: string;
  };

  orderId: string;
}

const PaymentProcess = ({ result, orderId }: Props) => {
  return (
    <div className="flex h-dvh w-full items-center justify-center">
      {result?.loading && (
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-[1.125rem] font-medium">
            Confirming your Payment
          </h1>
          <div>
            <BeatLoader color="#36d7b7" size={20} />
          </div>
          <p>Please wait</p>
        </div>
      )}

      {result?.error && (
        <div className="flex min-h-[15rem] max-w-[30rem] flex-col items-center justify-center gap-4 rounded-xl bg-slate-100 px-3 py-6 shadow md:w-[27rem] md:px-7">
          <div className="flex size-[2.5rem] items-center justify-center rounded-full bg-red-500">
            <Image
              src="/images/icons/cancel.svg"
              width={20}
              height={20}
              alt="mark"
            />
          </div>
          <div>
            <p className="text-center text-[1.2rem] font-medium text-red-300">
              {result?.error}
            </p>
          </div>
          <div className="mt-4">
            <Link href={`/buyer/sellers/order/${orderId}`}>
              <Button className="bg-red-400 text-light-900">Go Back</Button>
            </Link>
          </div>
        </div>
      )}

      {result?.success && (
        <div className="flex min-h-[15rem] max-w-[30rem] flex-col items-center justify-center gap-4 rounded-xl bg-slate-100 px-3 py-6 shadow md:w-[27rem] md:px-7">
          <div>
            <Image
              src="/images/icons/green-check.svg"
              width={40}
              height={40}
              alt="mark"
            />
          </div>
          <div>
            <p className="text-center text-[1.2rem] font-medium text-primary-400">
              {result?.success}
            </p>
          </div>
          <div className="mt-4">
            <Link href={`/buyer/orders/${orderId}`}>
              <Button className="bg-primary-500 text-light-900">
                View Order
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentProcess;
