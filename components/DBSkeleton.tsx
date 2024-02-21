import React from "react";

const DBSkeleton = ({ message }: { message: string }) => {
  return (
    <div className="flex h-20 w-full items-center justify-center rounded-md bg-light-900">
      <p className="text-[1.125rem] font-medium">{message}</p>
    </div>
  );
};

export default DBSkeleton;
