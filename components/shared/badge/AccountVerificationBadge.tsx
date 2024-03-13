import React from "react";
import { IoMdCheckmark } from "react-icons/io";
import { IoClose } from "react-icons/io5";

const AccountVerificationBadge = ({ isVerified }: { isVerified: boolean }) => {
  return (
    <>
      {isVerified ? (
        <div className="flex w-max items-center gap-2 rounded-[2rem] bg-gray-200 px-2">
          <span className="text-primary-500">
            <IoMdCheckmark />
          </span>
          <span>Verified</span>
        </div>
      ) : (
        <div className="flex w-max items-center gap-2 rounded-[2rem] bg-gray-200 px-2">
          <span className="text-red-500">
            <IoClose />
          </span>
          <span>Not verified</span>
        </div>
      )}
    </>
  );
};

export default AccountVerificationBadge;
