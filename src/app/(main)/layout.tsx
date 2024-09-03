import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import React, { useContext } from "react";
import SessionProvider from "./SessionProvider";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("Layout file runing");
  const session = await validateRequest();

  if (!session.user) redirect("/login");

  return <SessionProvider value={session}>{children}</SessionProvider>;
}
