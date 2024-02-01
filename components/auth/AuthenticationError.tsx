import Link from "next/link";
import { Button } from "../ui/button";
import AuthFormWrapper from "./AuthFormWrapper";

const AuthenticationError = () => {
  return (
    <AuthFormWrapper
      backButton={false}
      footerText="Don't have an account?"
      footerHrefLabel="Sign Up"
      footerHref="/auth/register"
    >
      <div className="flex w-[18.75rem] flex-col items-center justify-center gap-[3rem] xs:w-[25rem]">
        <h1 className="mb-[1.3rem] font-fraunces text-[1.5rem] text-[#151515]">
          Oops! Something went wrong!
        </h1>
        <Button className="h-[3rem] w-full rounded-[4px] bg-primary-500 font-fraunces text-light-900">
          <Link href="/auth/login">Back to Log In</Link>
        </Button>
      </div>
    </AuthFormWrapper>
  );
};

export default AuthenticationError;
