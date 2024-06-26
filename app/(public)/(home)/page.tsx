// import Businesses from "@/components/shared/Businesses";
import Contributions from "@/components/pages/home/Contributions";
import Features from "@/components/pages/home/Features";
import HomeHero from "@/components/pages/home/HomeHero";

const Page = async () => {
  return (
    <div className="">
      <HomeHero />
      <Features />
      <Contributions />
      {/* <Businesses /> */}
    </div>
  );
};

export default Page;
