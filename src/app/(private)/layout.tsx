"use client";

import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <React.Fragment>
      <div className="flex-center h-screen w-screen">{children}</div>
    </React.Fragment>
  );
}
