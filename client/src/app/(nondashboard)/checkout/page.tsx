"use client";

import CheckoutDetailsPage from "@/components/checkout/CheckoutDetailsPage";
import CompletionPage from "@/components/checkout/CompletionPage";
import PaymentPage from "@/components/checkout/PaymentPage";
import WizardStepper from "@/components/checkout/WizardStepper";
import Loading from "@/components/shared/Loading";
import { useCheckoutNavigation } from "@/hooks/useCheckoutNavigation";
import { useUser } from "@clerk/nextjs";
import React from "react";

const CheckoutWizard = () => {
  const { isLoaded } = useUser();
  const { checkoutStep } = useCheckoutNavigation();

  if (!isLoaded) return <Loading />;

  const renderStep = () => {
    switch (checkoutStep) {
      case 1:
        return <CheckoutDetailsPage />;
      case 2:
        return <PaymentPage />;
      case 3:
        return <CompletionPage />;
      default:
        return "checkout details page";
    }
  };

  return (
    <div className="checkout">
      <WizardStepper currentStep={checkoutStep} />
      <div className="checkout__content">{renderStep()}</div>
    </div>
  );
};

export default CheckoutWizard;
