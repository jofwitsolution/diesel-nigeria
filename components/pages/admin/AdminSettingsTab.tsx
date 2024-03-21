import { User } from "@prisma/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Preferences from "@/components/forms/Preferences";
import Security from "@/components/forms/Security";

interface Props {
  user: User;
}

const AdminSettingsTab = ({ user }: Props) => {
  return (
    <div className="max-w-[54rem] rounded-lg bg-light-900 px-3 py-6 md:px-6 md:py-14">
      <Tabs defaultValue="security" className="">
        <TabsList className="">
          <TabsTrigger
            value="security"
            className="border-b-2 text-[#6D7175] data-[state=active]:border-b-4 data-[state=active]:border-primary-500 data-[state=active]:text-black max-xs:px-2 max-xs:text-[0.7rem]"
          >
            Security
          </TabsTrigger>
          <TabsTrigger
            value="preferences"
            className="border-b-2 text-[#6D7175] data-[state=active]:border-b-4 data-[state=active]:border-primary-500 data-[state=active]:text-black max-xs:px-2 max-xs:text-[0.7rem]"
          >
            Preferences
          </TabsTrigger>
        </TabsList>

        <TabsContent value="security" className="w-full space-y-6">
          <div>
            <Security />
          </div>
        </TabsContent>
        <TabsContent value="preferences" className="w-full space-y-6">
          <div>
            <Preferences />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettingsTab;
