import Buyers from "@/components/pages/admin/Buyers";
import { adminGetUsersByRole } from "@/lib/actions/admin.action";

const Page = async () => {
  const result = await adminGetUsersByRole("buyer");

  return (
    <div className="">
      <Buyers buyers={result.users ?? []} />
    </div>
  );
};

export default Page;
