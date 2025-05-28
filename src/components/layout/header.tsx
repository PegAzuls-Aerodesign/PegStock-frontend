"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Spinner } from "../ui/spinner";

const user = {
  name: "admin",
};

export const Header: React.FC = () => {
  return (
    <header className="h-header fixed top-0 left-0 flex w-screen items-center justify-end gap-2 bg-white p-4 px-8 shadow-2xl">
      {user ? <HeaderUser /> : <Spinner />}
    </header>
  );
};

const HeaderUser: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <Avatar>
        <AvatarImage src="https://github.com/vynijales.png" />
        <AvatarFallback>
          <Spinner className="text-brand-blue-500" />
        </AvatarFallback>
      </Avatar>
      <div className="text-brand-blue-500 hidden text-right sm:block">
        <p className="text-lg">
          Olá,{" "}
          <span className="font-semibold" title={user.name}>
            {user.name.split(" ")[0]}
          </span>
        </p>
      </div>
    </div>
  );
};
