import Businesses from "@/components/pages/home/Businesses";
import Contributions from "@/components/pages/home/Contributions";
import Features from "@/components/pages/home/Features";
import HomeHero from "@/components/pages/home/HomeHero";

const Page = () => {
  return (
    <div>
      <HomeHero />
      <Features />
      <Contributions />
      <Businesses />
    </div>
  );
};

export default Page;
