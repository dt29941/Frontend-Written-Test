"use client"
import { SessionProvider } from "next-auth/react";
import AuthWrapper from "../components/authWrapper";


const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <AuthWrapper>
        <div>
          {/* Your layout components (header, sidebar, etc.) */}
          {children}
        </div>
      </AuthWrapper>
    </SessionProvider>
  );
};

export default Layout;