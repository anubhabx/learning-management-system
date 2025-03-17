import React from "react";
import StripeProvider from "./StripeProvider";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useCheckoutNavigation } from "@/hooks/useCheckoutNavigation";
import { useCurrentCourse } from "@/hooks/useCurrentCourse";
import { useClerk, useUser } from "@clerk/nextjs";
import CoursePreview from "../shared/CoursePreview";
import { CreditCard } from "lucide-react";
import { Button } from "../ui/button";
import { useCreateTransactionMutation } from "@/state/api";
import { toast } from "sonner";

const PaymentPageContent = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [createTransaction] = useCreateTransactionMutation();
  const { navigateToStep } = useCheckoutNavigation();
  const { course, courseId } = useCurrentCourse();
  const { user } = useUser();
  const { signOut } = useClerk();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast.error("Stripe service is not available");
      return;
    }

    const baseUrl = process.env.NEXT_PUBLIC_LOCAL_URL
      ? `http://${process.env.NEXT_PUBLIC_LOCAL_URL}`
      : process.env.NEXT_PUBLIC_VERCEL_URL
        ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
        : window.location.origin;

    //   console.log("Base URL:", baseUrl);
    //   console.log("Return URL:", `${baseUrl}/checkout?step=3&id=${courseId}`);
    //   console.log("Course ID:", courseId);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${baseUrl}/checkout?step=3&id=${courseId}`,
      },
      redirect: "if_required",
    });

    //   console.log("Stripe result:", result);

    if (result.error) {
      toast.error(result.error.message);
      return;
    }

    if (result.paymentIntent?.status === "succeeded") {
      const transactionData: Partial<Transaction> = {
        transactionId: result.paymentIntent.id,
        userId: user?.id,
        courseId: courseId,
        paymentProvider: "stripe",
        amount: course?.price || 99999999,
      };

      const res = await createTransaction(transactionData);
      console.log("Transaction response:", res);
      navigateToStep(3);
    }
  };

  const handleSignOutAndNavigate = async () => {
    await signOut();
    navigateToStep(1);
  };

  if (!course) return null;

  return (
    <div className="payment">
      <div className="payment__container">
        <div className="payment__preview">
          <CoursePreview course={course} />
        </div>

        <div className="payment__from-container">
          <form
            id="payment-form"
            className="payment-form"
            onSubmit={handleSubmit}
          >
            <div className="payment__content">
              <h1 className="payment__title">Checkout</h1>
              <p className="payment__subtitle">
                Enter your payment details to complete your purchase
              </p>

              <div className="payment__method">
                <h3 className="payment__method-title">Payment Method</h3>

                <div className="payment__card-container">
                  <div className="payment__card-header">
                    <CreditCard size={24} />
                    <span>Credit/Debit Card</span>
                  </div>

                  <div className="payment__card-element">
                    <PaymentElement />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="payment__actions">
        <Button
          className="hover:bg-white-50/10"
          onClick={handleSignOutAndNavigate}
          variant={"outline"}
          type="button"
        >
          Switch Account
        </Button>
        <Button
          form="payment-form"
          className="payment__submit"
          disabled={!stripe || !elements}
          type="submit"
        >
          Pay With Card
        </Button>
      </div>
    </div>
  );
};

const PaymentPage = () => (
  <StripeProvider>
    <PaymentPageContent />
  </StripeProvider>
);

export default PaymentPage;
