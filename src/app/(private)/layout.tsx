"use client";

import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <React.Fragment>
      <div>{children}</div>
    </React.Fragment>
  );
}
