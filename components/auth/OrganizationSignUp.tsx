"use client";

import React, { useState } from "react";
import * as z from "zod";
import OrgSignUpForm from "../forms/OrgSignUpForm";
import { IndividualSignUpSchema } from "@/lib/validations";
import BusinessProfileForm from "../forms/BusinessProfileForm";

const OrganizationSignUp = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [signupData, setSignupData] = useState<z.infer<
    typeof IndividualSignUpSchema
  > | null>(null);

  return (
    <div>
      {currentStep === 1 && (
        <OrgSignUpForm
          getSignUpData={(data: z.infer<typeof IndividualSignUpSchema>) =>
            setSignupData(data)
          }
          nextStep={() => setCurrentStep(2)}
        />
      )}
      {currentStep === 2 && <BusinessProfileForm signupData={signupData} />}
    </div>
  );
};

export default OrganizationSignUp;
