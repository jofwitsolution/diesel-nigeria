import React from "react";
import AdminOrdersTable from "@/components/shared/table/AdminOrdersTable";
import { adminGetAllOrders } from "@/lib/actions/admin.action";

const Page = async () => {
  const result = await adminGetAllOrders("desc");

  return (
    <div className="flex max-w-[73.125rem] gap-6">
      <AdminOrdersTable orders={result.orders ?? []} />
    </div>
  );
};

export default Page;
