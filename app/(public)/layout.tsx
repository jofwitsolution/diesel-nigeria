import React from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/shared/navbar/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="mx-auto min-h-screen max-w-[90rem] bg-primary-50">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
};

export default Layout;
