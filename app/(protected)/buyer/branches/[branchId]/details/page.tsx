import Image from "next/image";
import Link from "next/link";
import BuyerBranchTabs from "@/components/pages/buyer/BuyerBranchTabs";
import { Button } from "@/components/ui/button";
import {
  getBuyerOverview,
  getPurchaseAnalytics,
} from "@/lib/actions/buyer.action";
import { getCurrentUser } from "@/lib/helpers/auth";
import { getOrdersByBranch } from "@/lib/actions/order.action";

const page = async ({ params }: { params: { branchId: string } }) => {
  const currentUser = await getCurrentUser();

  const analyticsResult = await getPurchaseAnalytics(params.branchId);
  const overviewResult = await getBuyerOverview(params.branchId);
  const orderResult = await getOrdersByBranch(
    currentUser?.id!,
    params.branchId
  );

  return (
    <div className="max-w-[100.0625rem]">
      <div className="flex justify-between gap-6">
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

        <Link href="/buyer/sellers">
          <Button className="bg-primary-500 px-[2.5625rem] py-[0.5625rem] text-light-900 hover:bg-primary-400">
            Buy Deisel
          </Button>
        </Link>
      </div>
      <div className="mt-10">
        <BuyerBranchTabs
          analyticsData={analyticsResult}
          overviewData={overviewResult}
          orders={orderResult?.orders ?? []}
        />
      </div>
    </div>
  );
};

export default page;
