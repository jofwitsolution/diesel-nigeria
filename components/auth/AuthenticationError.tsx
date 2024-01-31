import Link from "next/link";
import { Button } from "../ui/button";
import AuthFormWrapper from "./AuthFormWrapper";

const AuthenticationError = () => {
  return (
    <AuthFormWrapper
      headerText="Oops! Something went wrong!"
      backButton={false}
      footerText="Don't have an account?"
      footerHrefLabel="Sign Up"
      footerHref="/auth/register"
    >
      <div className="w-[18.75rem] xs:w-[25rem]">
        <Button className="h-[3rem] w-full rounded-[4px] bg-primary-500 font-fraunces text-light-900">
          <Link href="/auth/login">Back to Log In</Link>
        </Button>
      </div>
    </AuthFormWrapper>
  );
};

export default AuthenticationError;
