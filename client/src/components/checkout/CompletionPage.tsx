import { Check } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const CompletionPage = () => {
  return (
    <div className="completion">
      <div className="completion__content">
        <div className="completion__icon">
          <Check className="w-16 h-16" />
        </div>
        <h1 className="completion__title">
          Thank you for your order! Your order has been completed.
        </h1>
        <p className="completion__message">
          You will receive an email confirmation shortly.
        </p>
      </div>
      <div className="completion__support">
        <p className="text-center">
          If you have any questions or need help, please contact our support
          team at{" "}
          <Button variant={"link"} asChild className="p-0 m-0 text-primary-700">
            <Link scroll={false} href="mailto:support@example.com">Customer Support</Link>
          </Button>
        </p>
      </div>
      <div className="completion__action">
        <Link scroll={false} href="/user/courses">Go to courses</Link>
      </div>
    </div>
  );
};

export default CompletionPage;
