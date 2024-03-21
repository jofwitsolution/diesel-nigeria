import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import DBSkeleton from "@/components/DBSkeleton";
import AdminOrderDetails from "@/components/pages/admin/AdminOrderDetails";
import { getSingleReversal } from "@/lib/actions/other.actions";
import AdminReversalDetails from "@/components/pages/admin/AdminReversalDetails";

const Page = async ({ params }: { params: { reversalId: string } }) => {
  const result = await getSingleReversal(params.reversalId);

  return (
    <div className="max-w-[100.0625rem] space-y-6">
      <div className="flex justify-between gap-6">
        <h1 className="font-medium md:text-[1.25rem]">Reversal Request</h1>
        <Link href="/admin/disputes">
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
        {result?.reversal && (
          <AdminReversalDetails reversal={result.reversal} />
        )}
        {result?.order && <AdminOrderDetails order={result.order} />}

        {result?.error ? (
          <DBSkeleton message={result?.error} />
        ) : !result?.reversal ? (
          <DBSkeleton message={"Loading..."} />
        ) : null}
      </div>
    </div>
  );
};

export default Page;
