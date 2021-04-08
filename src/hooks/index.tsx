import React from "react";

import { AuthProvider } from "./auth";
import { SuperunitProvider } from "./superunit";
import { AccessProvider } from "./access";
import Notification from "../components/Notification";

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <SuperunitProvider>
      <AccessProvider>
        <Notification />
        {children}
      </AccessProvider>
    </SuperunitProvider>
  </AuthProvider>
);

export default AppProvider;
