import Header from "@/components/shared/Header";
import { UserProfile } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import React from "react";

const UserDashboardPage = () => {
  return (
    <>
      <Header
        title="User Dashboard"
        subtitle="Welcome to your user dashboard"
      />
      <UserProfile
        path="/user/dashboard"
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

export default UserDashboardPage;
