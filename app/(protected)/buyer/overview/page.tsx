import { auth } from "@/auth";
import React from "react";

const OverviewPage = async () => {
  const session = await auth();

  return (
    <div className="w-[40rem]">
      {JSON.stringify(session)}
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe nobis at
        assumenda non nam? Tenetur voluptates praesentium eius quod quis labore
        ab porro a eveniet quae, rem debitis asperiores eum.
      </p>
      <div className="h-[30rem] w-full bg-red-300"></div>
      <div className="h-[30rem] w-full bg-red-300"></div>
    </div>
  );
};

export default OverviewPage;
