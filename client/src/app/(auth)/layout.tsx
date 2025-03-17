import React, { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return <div className="auth__root">{children}</div>;
};

export default AuthLayout;
