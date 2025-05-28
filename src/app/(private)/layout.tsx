import { Header } from "@/components/layout/header";
import React from "react";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <React.Fragment>
      <Header />
      <div className="flex-center h-screen w-screen pt-[var(--h-header)]">
        <div className="container flex h-full min-h-4/5 flex-col items-center justify-around shadow-2xl">
          {children}
        </div>
      </div>
    </React.Fragment>
  );
}
