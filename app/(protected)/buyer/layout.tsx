import React from "react";
import Dashboard from "@/components/shared/Dashboard";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Dashboard>{children}</Dashboard>
    </div>
  );
};

export default Layout;
