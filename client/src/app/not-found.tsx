import ErrorPage from "@/components/shared/ErrorPage";
import NonDashboardNavbar from "@/components/shared/NonDashboardNavbar";
import Footer from "@/components/shared/Footer";

export default function NotFound() {
  return (
    <div className="nondashboard-layout">
      <NonDashboardNavbar />
      <main className="nondashboard-layout__main">
        <ErrorPage 
          statusCode={404}
          title="Page Not Found" 
          description="Oops! The page you're looking for doesn't exist or has been moved."
        />
      </main>
      <Footer />
    </div>
  );
}