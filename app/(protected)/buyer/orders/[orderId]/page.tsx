import Image from "next/image";
import Link from "next/link";
import BuyerOrderDetails from "@/components/pages/buyer/BuyerOrderDetails";
import { Button } from "@/components/ui/button";
import { getOrder } from "@/lib/actions/user.action";
import DBSkeleton from "@/components/DBSkeleton";

const Page = async ({ params }: { params: { orderId: string } }) => {
  const result = await getOrder(params.orderId);

  return (
    <div className="max-w-[100.0625rem] space-y-6">
      <div className="flex justify-between gap-6">
        <h1 className="font-medium md:text-[1.25rem]">Order Details</h1>
        <Link href="/buyer/orders">
          <Button className="flex items-center gap-1 border text-[0.875rem]">
            <Image
              src="/images/icons/arrow-left.svg"
              width={24}
              height={24}
              alt="arrow-left"
              className="max-xs:hidden"
            />
            Back
          </Button>
        </Link>
      </div>
      <div className="w-full">
        {result?.order && <BuyerOrderDetails order={result.order} />}

        {result?.error ? (
          <DBSkeleton message={result?.error} />
        ) : !result?.order ? (
          <DBSkeleton message={"Loading..."} />
        ) : null}
      </div>
    </div>
  );
};

export default Page;
