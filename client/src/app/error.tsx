/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import ErrorPage from "@/components/shared/ErrorPage";
import NonDashboardNavbar from "@/components/shared/NonDashboardNavbar";
import Footer from "@/components/shared/Footer";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="nondashboard-layout">
      <NonDashboardNavbar />
      <main className="nondashboard-layout__main">
        <ErrorPage
          statusCode={500}
          title="Something went wrong!"
          description="We apologize for the inconvenience. Please try refreshing the page or contact support if the issue persists."
          showBackButton={false}
          showHomeButton={true}
        />
      </main>
      <Footer />
    </div>
  );
}
