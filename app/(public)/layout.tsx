import React from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/shared/navbar/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="top-padding bg-primary-50">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
};

export default Layout;
