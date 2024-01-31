import React from "react";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";

interface SocialProps {
  callbackUrl: string | null;
}

const Social = ({ callbackUrl }: SocialProps) => {
  return (
    <>
      <div className="mb-4 flex w-full items-center justify-between">
        <div className="h-[1px] w-[40%] bg-[#E4E6EC]" />
        <span className="text-[0.87rem] font-medium text-[#969AB8]">or</span>
        <div className="h-[1px] w-[40%] bg-[#E4E6EC]" />
      </div>
      <Button
        type="button"
        onClick={() =>
          signIn("google", {
            callbackUrl: callbackUrl || "/buyer/overview",
          })
        }
        className="h-[3rem] w-full space-x-4 rounded-[4px] border border-[#E0E2E9] font-semibold"
      >
        <Image
          src="/images/icons/google.svg"
          width={27}
          height={27.551}
          alt="google"
        />
        <span>Google</span>
      </Button>
    </>
  );
};

export default Social;
