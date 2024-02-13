"use client";

import React, { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import AuthFormWrapper from "./AuthFormWrapper";
import { FormSuccess } from "../forms/FormSuccess";
import { FormError } from "../forms/FormError";
import { newVerification } from "@/lib/actions/auth.action";
import { useRouter, useSearchParams } from "next/navigation";
import AuthDialog from "./AuthDialog";

const NewVerification = () => {
  const router = useRouter();
  const [dialogState, setDialogState] = useState(false);
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

        if (data.success) {
          setDialogState(true);
        }
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <>
      <AuthFormWrapper backButton={false}>
        <div className="flex w-[18.75rem] flex-col items-center justify-center gap-[3rem] xs:w-[25rem]">
          {!success && !error && (
            <>
              <h1 className="mb-[1.3rem] font-fraunces text-[1.5rem] text-[#151515]">
                Confirming verification
              </h1>
              <BeatLoader color="green" />
            </>
          )}
          <FormSuccess message={success} />
          {error && (
            <>
              <h1 className="mb-[1.3rem] font-fraunces text-[1.5rem] text-red-300">
                Verification Failed
              </h1>
              <FormError message={error} />
            </>
          )}
        </div>
      </AuthFormWrapper>
      <AuthDialog
        open={dialogState}
        handleOpen={() => {
          setDialogState(!dialogState);
          router.replace("/auth/login");
        }}
        title="Verification Successful"
      >
        <p className="text-center leading-[1.5rem] sm:my-6 sm:text-[1.13rem]">
          Your email address has been Successfuly verified. Please proceed to
          Log In.
        </p>
      </AuthDialog>
    </>
  );
};

export default NewVerification;
