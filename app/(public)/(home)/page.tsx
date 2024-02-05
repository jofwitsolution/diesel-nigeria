import Businesses from "@/components/shared/Businesses";
import Contributions from "@/components/pages/home/Contributions";
import Features from "@/components/pages/home/Features";
import HomeHero from "@/components/pages/home/HomeHero";
import { getUser } from "@/lib/actions/user.action";

const Page = async () => {
  await getUser("cls922m2o0000786y4w4smk7t");
  return (
    <div className="">
      <HomeHero />
      <Features />
      <Contributions />
      <Businesses />
    </div>
  );
};

export default Page;
