import AdminSettingsTab from "@/components/pages/admin/AdminSettingsTab";
import { getUser } from "@/lib/actions/user.action";
import { getCurrentUser } from "@/lib/helpers/auth";

const Page = async () => {
  const user = await getCurrentUser();
  const result = await getUser(user!.id as string);

  return (
    <div className="max-w-[73.125rem] space-y-6">
      <div className="flex w-full justify-between">
        <div className="flex flex-col gap-2">
          <span className="font-medium md:text-[1.25rem]">Settings</span>
          <span className="text-[0.875rem]">Modify the default settings</span>
        </div>
      </div>
      <div className="w-full">
        <AdminSettingsTab user={result.user} />
      </div>
    </div>
  );
};

export default Page;
