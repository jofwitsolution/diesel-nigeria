import React from "react";
import Dashboard from "@/components/shared/Dashboard";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-primary-50">
      <Dashboard>{children}</Dashboard>
    </div>
  );
};

export default Layout;
