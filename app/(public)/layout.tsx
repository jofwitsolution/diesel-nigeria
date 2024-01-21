import Navbar from "@/components/shared/navbar/Navbar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="mx-auto min-h-screen max-w-[90rem] bg-primary-50">
      <Navbar />
      {children}
    </main>
  );
};

export default Layout;
