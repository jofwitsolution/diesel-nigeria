import DBNavbar from "@/components/shared/navbar/DBNavbar";
import React from "react";
import DBLeft from "./navbar/DBLeft";

interface Props {
  children: React.ReactNode;
}

const Dashboard = ({ children }: Props) => {
  return (
    <div className="">
      <DBNavbar />
      <div className="flex">
        <DBLeft />
        <section className="mx-3 w-full pb-6 pt-[4.875rem] md:mx-6">
          {children}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
