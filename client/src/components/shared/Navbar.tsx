"use client";

import { Bell, BookOpen } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { SidebarTrigger } from "../ui/sidebar";
import { cn } from "@/lib/utils";

const Navbar = ({ isCoursePage }: { isCoursePage: boolean }) => {
  const { user } = useUser();
  const userType =
    (user?.publicMetadata?.userType as "student" | "teacher") === "teacher" ||
    "student";

  return (
    <nav className="dashboard-navbar">
      <div className="dashboard-navbar__container">
        <div className="dashboard-navbar__search">
          <div className="md:hidden">
            <SidebarTrigger className="dashboard-navbar__sidebar-trigger" />
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group">
              <Link scroll={false}
                href="/search"
                className={cn("dashboard-navbar__search-input", {
                  "bg-customgreys-secondarybg": isCoursePage,
                })}
              >
                <span className="hidden sm:inline">Search Courses</span>
                <span className="sm:hidden">Search</span>
              </Link>
              <BookOpen className="dashboard-navbar__search-icon" />
            </div>
          </div>
        </div>
        <div className="dashboard-navbar__actions">
          <Button className="dashboard-navbar__notification-button">
            <span className="dashboard-navbar__notification-indicator" />
            <Bell className="dashboard-navbar__notification-icon" />
          </Button>

          <UserButton
            appearance={{
              baseTheme: dark,
              elements: {
                userButtonOuterIdentifier: "text-customgreys-dirtyGrey",
                userButtonAvatarBox: "scale-90 sm:scale-100",
              },
            }}
            showName={true}
            userProfileMode="navigation"
            userProfileUrl={
              userType === "student" ? "/user/dashboard" : "/teacher/dashboard"
            }
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
