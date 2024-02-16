import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SellerBusinessInfo from "@/components/forms/SellerBusinessInfo";

const SellerSettingsTab = () => {
  return (
    <div className="max-w-[54rem] rounded-lg bg-light-900 px-3 py-6 md:px-6 md:py-14">
      <Tabs defaultValue="profile" className="1332px:w-[67.125rem]">
        <TabsList className="xs:w-full lg:w-[45rem]">
          <TabsTrigger
            value="profile"
            className="flex-1 border-b-2 text-[#6D7175] data-[state=active]:border-primary-500 data-[state=active]:text-black max-xs:px-2 max-xs:text-[0.7rem]"
          >
            Profile
          </TabsTrigger>
          <TabsTrigger
            value="bank-details"
            className="flex-1 border-b-2 text-[#6D7175] data-[state=active]:border-primary-500 data-[state=active]:text-black max-xs:px-2 max-xs:text-[0.7rem]"
          >
            Bank Details
          </TabsTrigger>
          <TabsTrigger
            value="preferences"
            className="flex-1 border-b-2 text-[#6D7175] data-[state=active]:border-primary-500 data-[state=active]:text-black max-xs:px-2 max-xs:text-[0.7rem]"
          >
            Preferences
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="flex-1 border-b-2 text-[#6D7175] data-[state=active]:border-primary-500 data-[state=active]:text-black max-xs:px-2 max-xs:text-[0.7rem]"
          >
            Security
          </TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="w-full space-y-6">
          <div>
            <SellerBusinessInfo />
          </div>
        </TabsContent>
        <TabsContent value="bank-details" className="w-full space-y-6">
          <div>Bank Details</div>
        </TabsContent>
        <TabsContent value="preferences" className="w-full space-y-6">
          <div>Preferences</div>
        </TabsContent>
        <TabsContent value="security" className="w-full space-y-6">
          <div>Secuirty</div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SellerSettingsTab;
