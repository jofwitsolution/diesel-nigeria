import DBNavbar from "@/components/shared/navbar/DBNavbar";
import React from "react";
import DBLeft from "./navbar/DBLeft";
import { getUser } from "@/lib/actions/user.action";
import { getCurrentUser } from "@/lib/helpers/auth";

interface Props {
  children: React.ReactNode;
}

const Dashboard = async ({ children }: Props) => {
  const currentUser = await getCurrentUser();
  const result = await getUser(currentUser?.id!);

  return (
    <div className="">
      <DBNavbar user={result?.user} />
      <div className="flex">
        <DBLeft user={result?.user} />
        <section className="mx-3 w-full pb-6 pt-[4.875rem] md:mx-6">
          {children}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
