import SumCard from "@/components/shared/card/SumCard";
import { getAdminOverview } from "@/lib/actions/admin.action";

const SummaryCards = async () => {
  const result = await getAdminOverview();

  return (
    <div className="flex flex-wrap gap-4">
      <SumCard title="Products" icon="/images/icons/product.svg">
        <span className="text-[1.125rem] font-medium">
          {" "}
          {result?.totalProducts ?? 0}
        </span>
      </SumCard>
      <SumCard title="Completed Orders" icon="/images/icons/actions.svg">
        <span className="text-[1.125rem] font-medium">
          {" "}
          {result?.completedOrders ?? 0}
        </span>
      </SumCard>
      <SumCard title="Pending Orders" icon="/images/icons/actions.svg">
        <span className="text-[1.125rem] font-medium">
          {result?.pendingOrders ?? 0}
        </span>
      </SumCard>
      <SumCard title="Total Orders" icon="/images/icons/reserve-action.svg">
        <span className="text-[1.125rem] font-medium">
          {result?.totalOrders ?? 0}
        </span>
      </SumCard>
      <SumCard title="Total Buyers" icon="/images/icons/reserve-action.svg">
        <span className="text-[1.125rem] font-medium">
          {result?.totalBuyers ?? 0}
        </span>
      </SumCard>
      <SumCard title="Total Sellers" icon="/images/icons/actions.svg">
        <span className="text-[1.125rem] font-medium">
          {result?.totalSellers ?? 0}
        </span>
      </SumCard>
    </div>
  );
};

export default SummaryCards;
