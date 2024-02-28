"use client";

import React from "react";
import { BeatLoader } from "react-spinners";

interface Props {
  result: {
    loading: boolean;
    error: string;
    orderId: string;
    success: string;
  };
}

const PaymentProcess = ({ result }: Props) => {
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
        <div className="flex h-[15rem] max-w-[30rem] flex-col items-center justify-center gap-4 rounded-xl bg-slate-200 px-3 py-6 shadow md:px-7">
          <div>
            <p className="text-[1.2rem] text-red-300">{result?.error}</p>
          </div>
        </div>
      )}

      {result?.success && (
        <div className="flex h-[15rem] max-w-[30rem] flex-col items-center justify-center gap-4 rounded-xl bg-slate-200 px-3 py-6 shadow md:px-7">
          <div>
            <p className="text-[1.2rem] text-primary-400">{result?.success}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentProcess;
