import React from "react";
import PaymentProcess from "@/components/PaymentProcess";
import { verifyOrderPayment } from "@/lib/actions/buyer.action";

interface URLProps {
  params: { orderId: string };
  searchParams: { [key: string]: string | undefined };
}

const PaymentProcessPage = async ({ searchParams }: URLProps) => {
  let result = {
    loading: true,
  };

  result = await verifyOrderPayment(searchParams.reference as string);

  return <PaymentProcess result={result} />;
};

export default PaymentProcessPage;
