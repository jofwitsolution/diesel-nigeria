import React from "react";
import { getOrder } from "@/lib/actions/user.action";
import DBSkeleton from "@/components/DBSkeleton";
import CurrentOrder from "@/components/pages/buyer/CurrentOrder";

const Page = async ({ params }: { params: { orderId: string } }) => {
  const result = await getOrder(params.orderId);

  return (
    <div className="max-w-[68.0625rem]">
      {result?.order && <CurrentOrder order={result?.order} />}
      {result?.error ? (
        <DBSkeleton message={result?.error} />
      ) : !result?.order ? (
        <DBSkeleton message={"Loading..."} />
      ) : null}
    </div>
  );
};

export default Page;
