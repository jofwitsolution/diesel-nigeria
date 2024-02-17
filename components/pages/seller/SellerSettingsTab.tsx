import { User } from "@prisma/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SellerBusinessInfo from "@/components/forms/SellerBusinessInfo";
import SellerBankDetails from "@/components/forms/SellerBankDetails";

interface Props {
  user: User;
}

const SellerSettingsTab = ({ user }: Props) => {
  return (
    <div className="max-w-[54rem] rounded-lg bg-light-900 px-3 py-6 md:px-6 md:py-14">
      <Tabs defaultValue="profile" className="">
        <TabsList className="">
          <TabsTrigger
            value="profile"
            className="border-b-2 text-[#6D7175] data-[state=active]:border-b-4 data-[state=active]:border-primary-500 data-[state=active]:text-black max-xs:px-2 max-xs:text-[0.7rem]"
          >
            Profile
          </TabsTrigger>
          <TabsTrigger
            value="bank-details"
            className="border-b-2 text-[#6D7175] data-[state=active]:border-b-4 data-[state=active]:border-primary-500 data-[state=active]:text-black max-xs:px-2 max-xs:text-[0.7rem]"
          >
            Bank Details
          </TabsTrigger>
          <TabsTrigger
            value="preferences"
            className="border-b-2 text-[#6D7175] data-[state=active]:border-b-4 data-[state=active]:border-primary-500 data-[state=active]:text-black max-xs:px-2 max-xs:text-[0.7rem]"
          >
            Preferences
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="border-b-2 text-[#6D7175] data-[state=active]:border-b-4 data-[state=active]:border-primary-500 data-[state=active]:text-black max-xs:px-2 max-xs:text-[0.7rem]"
          >
            Security
          </TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="w-full space-y-6">
          <div>
            <SellerBusinessInfo user={user} />
          </div>
        </TabsContent>
        <TabsContent value="bank-details" className="w-full space-y-6">
          <div>
            <SellerBankDetails user={user} />
          </div>
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
