"use client";

import React, { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import AuthFormWrapper from "./AuthFormWrapper";
import { FormSuccess } from "../forms/FormSuccess";
import { FormError } from "../forms/FormError";
import { newVerification } from "@/lib/actions/auth.action";
import { useSearchParams } from "next/navigation";

const NewVerification = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Missing token!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <AuthFormWrapper
      backButton={false}
      footerText="Back to Log In?"
      footerHrefLabel="Sign In"
      footerHref="/auth/login"
    >
      <div className="flex w-[18.75rem] flex-col items-center justify-center gap-[3rem] xs:w-[25rem]">
        <h1 className="mb-[1.3rem] font-fraunces text-[1.5rem] text-[#151515]">
          Confirming verification
        </h1>
        {!success && !error && <BeatLoader />}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </AuthFormWrapper>
  );
};

export default NewVerification;
