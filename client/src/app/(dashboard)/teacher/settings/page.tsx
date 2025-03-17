import NotificationSettings from "@/components/shared/NotificationSettings";
import React from "react";

const UserSettingsPage = () => {
  return (
    <div className="w-3/5">
      <NotificationSettings
        title="Teacher Settings"
        subtitle="Manage your teacher notification settings."
      />
    </div>
  );
};

export default UserSettingsPage;
