import SumCard from "@/components/shared/card/SumCard";

const SellerSummaryCards = () => {
  return (
    <div className="flex flex-wrap gap-4">
      <SumCard title="New Orders" icon="/images/icons/mail.svg">
        <span className="text-[1.125rem] font-medium">20</span>
      </SumCard>
      <SumCard title="Completed Orders" icon="/images/icons/actions.svg">
        <span className="text-[1.125rem] font-medium">470</span>
      </SumCard>
      <SumCard title="Price update Alert" icon="/images/icons/tag.svg">
        <span className="text-[1.125rem] font-medium">NGN 1,050/Litre</span>
        <span className="text-[0.75rem] text-[#808494]">
          Up from last 48 hours
        </span>
      </SumCard>
      <SumCard title="Total Orders" icon="/images/icons/reserve-action.svg">
        <span className="text-[1.125rem] font-medium">470</span>
      </SumCard>
      <SumCard title="Total Buyers" icon="/images/icons/reserve-action.svg">
        <span className="text-[1.125rem] font-medium">470</span>
      </SumCard>
      <SumCard title="Total Sellers" icon="/images/icons/actions.svg">
        <span className="text-[1.125rem] font-medium">470</span>
      </SumCard>
    </div>
  );
};

export default SellerSummaryCards;
