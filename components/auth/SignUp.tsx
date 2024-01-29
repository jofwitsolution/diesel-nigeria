import React from "react";
import AuthFormWrapper from "./AuthFormWrapper";
import { Button } from "../ui/button";
import Link from "next/link";

const SignUp = () => {
  return (
    <AuthFormWrapper
      headerText="Sign Up"
      backButton={false}
      footerText="Already have an account?"
      footerHrefLabel="Sign In"
      footerHref="/auth/login"
    >
      <div className="w-[18.75rem] space-y-8 xs:w-[25rem]">
        <Button
          asChild
          className="h-[5rem] w-full rounded-[4px] border border-[#9EA2B3] hover:border-primary-500"
        >
          <Link
            href="/auth/register/individual"
            className="font-fraunces font-normal text-[#002112]"
          >
            As an Individual
          </Link>
        </Button>
        <Button
          asChild
          className="h-[5rem] w-full rounded-[4px] border border-[#9EA2B3] hover:border-primary-500"
        >
          <Link
            href="/auth/register/organization"
            className="font-fraunces font-normal text-[#002112]"
          >
            As an Organization
          </Link>
        </Button>
      </div>
    </AuthFormWrapper>
  );
};

export default SignUp;
