import NonDashboardNavbar from "@/components/shared/NonDashboardNavbar";
import Landing from "./(nondashboard)/landing/page";
import Footer from "@/components/shared/Footer";

export default function Home() {
  return (
    <div className="nondashboard-layout">
      <NonDashboardNavbar />
      <main className="nondashboard-layout__main">
        <Landing />
      </main>
      <Footer />
    </div>
  );
}
