import React from "react";

const AccountStatusBadge = ({ isActive }: { isActive: boolean }) => {
  return (
    <>
      {isActive ? (
        <div className="flex w-max items-center gap-2 rounded-[2rem] bg-gray-200 px-2">
          <span className="inline-block size-2 rounded-full bg-primary-500" />
          <span>Active</span>
        </div>
      ) : (
        <div className="flex w-max items-center gap-2 rounded-[2rem] bg-gray-200 px-2">
          <span className="inline-block size-2 rounded-full bg-red-500" />
          <span>Suspended</span>
        </div>
      )}
    </>
  );
};

export default AccountStatusBadge;
