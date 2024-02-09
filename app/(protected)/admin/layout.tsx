import React from "react";
import { Metadata } from "next";
import Dashboard from "@/components/shared/Dashboard";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Dashboard>{children}</Dashboard>
    </div>
  );
};

export default Layout;
