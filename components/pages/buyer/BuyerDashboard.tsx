import React from "react";
import Dashboard from "@/components/shared/Dashboard";

interface Props {
  children: React.ReactNode;
}

const BuyerDashboard = ({ children }: Props) => {
  return <Dashboard>{children}</Dashboard>;
};

export default BuyerDashboard;
