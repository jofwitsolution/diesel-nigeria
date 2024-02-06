import DBNavbar from "@/components/shared/navbar/DBNavbar";
import React from "react";
import DBLeft from "./navbar/DBLeft";

interface Props {
  children: React.ReactNode;
}

const Dashboard = ({ children }: Props) => {
  return (
    <div>
      <DBNavbar />
      <div className="flex">
        <DBLeft />
        <section className="ml-[1rem] pt-[4.375rem]">{children}</section>
      </div>
    </div>
  );
};

export default Dashboard;
