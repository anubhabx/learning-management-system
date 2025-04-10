"use client";

import { Bell, BookOpen } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const NonDashboardNavbar = () => {
  const { user } = useUser();
  const userType =
    (user?.publicMetadata?.userType as "student" | "teacher") === "teacher" ||
    "student";

  return (
    <nav className="nondashboard-navbar">
      <div className="nondashboard-navbar__container">
        <div className="nondashboard-navbar__search">
          <Link scroll={false} href="/" className="nondashboard-navbar__brand">
            NextLearn
          </Link>

          <div className="flex items-center gap-4">
            <div className="relative group">
              <Link
                scroll={false}
                href="/search"
                className="nondashboard-navbar__search-input"
              >
                <span className="hidden sm:inline">Search Courses</span>
                <span className="sm:hidden">Search</span>
              </Link>
              <BookOpen className="nondashboard-navbar__search-icon" />
            </div>
          </div>
        </div>
        <div className="nondashboard-navbar__actions">
          <Button className="nondashboard-navbar__notification-button">
            <span className="nondashboard-navbar__notification-indicator" />
            <Bell className="nondashboard-navbar__notification-icon" />
          </Button>

          <SignedIn>
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
                userType === "student"
                  ? "/user/dashboard"
                  : "/teacher/dashboard"
              }
            />
          </SignedIn>

          <SignedOut>
            <Link
              scroll={false}
              href={"/sign-in"}
              className="nondashboard-navbar__auth-button--login"
            >
              Sign In
            </Link>
            <Link
              scroll={false}
              href={"/sign-up"}
              className="nondashboard-navbar__auth-button--signup"
            >
              Sign Up
            </Link>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
};

export default NonDashboardNavbar;
