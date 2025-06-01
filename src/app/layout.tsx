import type { Metadata } from "next";
import Sidebar from "./components/mainPage/sidebar";
import "./globals.css";
import StoreProvider from "./storeProvider";

export const metadata: Metadata = {
  title: "Crypto Leaner", 
  description: "Learn everything about Crypto",
  icons: {
    icon: "/file.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <div style={{ display: "flex", height: "100vh" }}>
            <Sidebar />
            <div style={{ flex: 1 }}>{children}</div>
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}