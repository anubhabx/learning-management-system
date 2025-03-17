import Header from "@/components/shared/Header";
import { UserProfile } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import React from "react";

const TeacherDashboardPage = () => {
  return (
    <>
      <Header title="Teacher Dashboard" subtitle="Welcome to your dashboard" />
      <UserProfile
        path="/teacher/dashboard"
        routing="path"
        appearance={{
          baseTheme: dark,
          elements: {
            scrollBox: "bg-customgreys-darkGrey",
            navbar: {
              "& > div:nth-child(1)": {
                background: "none",
              },
            },
          },
        }}
      />
    </>
  );
};

export default TeacherDashboardPage;
