import SumCard from "@/components/shared/card/SumCard";
import { getSellerOverview } from "@/lib/actions/seller.action";
import { formatPriceNGN } from "@/lib/utils";

const SellerSummaryCards = async () => {
  const result = await getSellerOverview();

  return (
    <div className="flex flex-wrap gap-4">
      <SumCard title="Products" icon="/images/icons/product.svg">
        <span className="text-[1.125rem] font-medium">
          {result?.totalProducts ?? 0}
        </span>
      </SumCard>
      <SumCard title="Total Litres" icon="/images/icons/nozzle-black.svg">
        <span className="text-[1.125rem] font-medium">
          {result?.totalLitres ?? 0}
        </span>
      </SumCard>
      <SumCard title="Price update Alert" icon="/images/icons/tag.svg">
        <span className="font-medium">
          {formatPriceNGN((result?.priceAlert as number) ?? 0)}/Litre
        </span>
        <span className="text-[0.75rem] text-[#808494]">
          Up from last 48 hours
        </span>
      </SumCard>
      <SumCard title="Total Orders" icon="/images/icons/reserve-action.svg">
        <span className="text-[1.125rem] font-medium">
          {result?.totalOrders ?? 0}
        </span>
      </SumCard>
      <SumCard title="Completed Orders" icon="/images/icons/actions.svg">
        <span className="text-[1.125rem] font-medium">
          {result?.completedOrders ?? 0}
        </span>
      </SumCard>
      <SumCard title="Pending Orders" icon="/images/icons/actions.svg">
        <span className="text-[1.125rem] font-medium">
          {result?.pendingOrders ?? 0}
        </span>
      </SumCard>
    </div>
  );
};

export default SellerSummaryCards;
