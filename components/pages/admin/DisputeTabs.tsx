import { Reversal } from "@prisma/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminReversalTable from "@/components/shared/table/AdminReversalTable";

interface Props {
  reversals: Reversal;
}

const DisputeTabs = ({ reversals }: Props) => {
  return (
    <div className="max-w-[64rem] rounded-lg bg-light-900 px-3 py-6 md:px-6 md:py-14">
      <Tabs defaultValue="reversal" className="">
        <TabsList className="">
          <TabsTrigger
            value="reversal"
            className="border-b-2 text-[#6D7175] data-[state=active]:border-b-4 data-[state=active]:border-primary-500 data-[state=active]:text-black max-xs:px-2 max-xs:text-[0.7rem]"
          >
            Reversal Request
          </TabsTrigger>
        </TabsList>
        <TabsContent value="reversal" className="w-full space-y-6">
          <div className="">
            <AdminReversalTable reversals={reversals} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DisputeTabs;
