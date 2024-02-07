import React from "react";
import DBSearchDistributor from "@/components/shared/search/DBSearchDistributor";
import TopSellers from "@/components/shared/TopSellers";
import RecentTransactions from "@/components/shared/table/RecentTransactions";
import PurchaseAnalytics from "@/components/shared/PurchaseAnalytics";

const OverviewPage = async () => {
  return (
    <div className="flex gap-6">
      <div className="mx-auto space-y-6 sm:w-[38rem] md:w-[42.9375rem]">
        <DBSearchDistributor />
        <TopSellers />
        <RecentTransactions />
        <PurchaseAnalytics />
      </div>
      <div className="hidden max-w-[28.0625rem] xl:block">
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi
          repudiandae deleniti commodi neque nihil, iure, maxime voluptate quis
          eligendi quibusdam id eveniet dolorum atque quia modi natus dolorem
          ipsam exercitationem.
        </p>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi
          repudiandae deleniti commodi neque nihil, iure, maxime voluptate quis
          eligendi quibusdam id eveniet dolorum atque quia modi natus dolorem
          ipsam exercitationem.
        </p>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi
          repudiandae deleniti commodi neque nihil, iure, maxime voluptate quis
          eligendi quibusdam id eveniet dolorum atque quia modi natus dolorem
          ipsam exercitationem.
        </p>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi
          repudiandae deleniti commodi neque nihil, iure, maxime voluptate quis
          eligendi quibusdam id eveniet dolorum atque quia modi natus dolorem
          ipsam exercitationem.
        </p>
      </div>
    </div>
  );
};

export default OverviewPage;
