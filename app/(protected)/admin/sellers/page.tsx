import Sellers from "@/components/pages/admin/Sellers";
import { adminGetUsersByRole } from "@/lib/actions/admin.action";

const SellersPage = async () => {
  const result = await adminGetUsersByRole("seller");

  return (
    <div className="">
      <Sellers sellers={result.users ?? []} />
    </div>
  );
};

export default SellersPage;
