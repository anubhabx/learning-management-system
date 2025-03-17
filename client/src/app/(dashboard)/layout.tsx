"use client";

import AppSidebar from "@/components/shared/AppSidebar";
import Loading from "@/components/shared/Loading";
import Navbar from "@/components/shared/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ChaptersSidebar from "./user/courses/[courseId]/ChapterSidebar";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const [courseId, setCourseId] = useState<string | null>(null);
  const { user, isLoaded } = useUser();

  useEffect(() => {
    const coursePageRegex = /\/user\/courses\/([^\/]+)/;
    const match = pathname.match(coursePageRegex);

    if (match) {
      setCourseId(match[1]);
    } else {
      setCourseId(null);
    }
  }, [pathname]);

  if (!isLoaded) {
    return <Loading />;
  }

  if (!user) {
    return <div>Please sign in to access this page.</div>;
  }

  return (
    <SidebarProvider>
      <div className="dashboard">
        <AppSidebar />
        <div className="dashboard__content">
          {courseId && <ChaptersSidebar />}
          <div className={cn("dashboard__main")} style={{ height: "100vh" }}>
            <Navbar isCoursePage={false} />
            <main className="dashboard__body">{children}</main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
